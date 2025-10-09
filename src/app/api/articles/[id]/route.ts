import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireAdmin, AuthenticatedRequest } from "../../lib/middleware";

// GET /api/articles/[id] - Get single article (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Get article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/articles/[id] - Update article (admin only)
async function putHandler(
  req: AuthenticatedRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { title, content, imageUrl, categoryId } = body;

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // If categoryId is provided, check if category exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 },
        );
      }
    }

    // Update article
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Article updated successfully",
        data: article,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/articles/[id] - Delete article (admin only)
async function deleteHandler(
  req: AuthenticatedRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Delete article
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export const PUT = requireAdmin(putHandler);
export const DELETE = requireAdmin(deleteHandler);

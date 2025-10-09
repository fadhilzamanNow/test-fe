import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireAdmin, AuthenticatedRequest } from "../../lib/middleware";

// PUT /api/categories/[id] - Update category (admin only)
async function putHandler(
  req: AuthenticatedRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { name } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 },
      );
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    // Check if new name already exists (excluding current category)
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name,
        id: { not: id },
      },
    });

    if (duplicateCategory) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 409 },
      );
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: { name },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: category,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/categories/[id] - Delete category (admin only)
async function deleteHandler(
  req: AuthenticatedRequest,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    // Check if category has articles
    const articlesCount = await prisma.article.count({
      where: { categoryId: id },
    });

    if (articlesCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with existing articles" },
        { status: 400 },
      );
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export const PUT = requireAdmin(putHandler);
export const DELETE = requireAdmin(deleteHandler);

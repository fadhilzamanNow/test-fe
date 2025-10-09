import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin, AuthenticatedRequest } from '../lib/middleware';

// GET /api/articles - List articles with pagination and filters (public)
async function getHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('category') || '';
    const limit = 10;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (category && category !== '-') {
      where.categoryId = category;
    }

    // Get total count
    const total = await prisma.article.count({ where });

    // Get articles with relations
    const articles = await prisma.article.findMany({
      where,
      skip,
      take: limit,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        data: articles,
        page,
        limit,
        total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article (admin only)
async function postHandler(req: AuthenticatedRequest) {
  try {
    const userId = req.user?.userId;
    const body = await req.json();
    const { title, content, imageUrl, categoryId } = body;

    // Validation
    if (!title || !content || !imageUrl || !categoryId) {
      return NextResponse.json(
        { error: 'Title, content, imageUrl, and categoryId are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Create article
    const article = await prisma.article.create({
      data: {
        title,
        content,
        imageUrl,
        categoryId,
        userId: userId!,
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
        message: 'Article created successfully',
        data: article,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = getHandler;
export const POST = requireAdmin(postHandler);

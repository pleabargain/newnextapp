import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Validation schema for API key update
const apiKeyUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  expirationDate: z.string().datetime().optional(),
  usageLimit: z.number().min(0).optional(),
  status: z.boolean().optional(),
});

const apiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

// GET /api/keys/[id] - Get single API key
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const key = await prisma.apiKey.findUnique({
      where: { id: params.id },
    });
    if (!key) {
      return NextResponse.json(
        { error: 'Not Found' },
        { status: 404 }
      );
    }
    return NextResponse.json(key);
  } catch (error) {
    console.error("Error in GET /api/keys/[id]:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT /api/keys/[id] - Update API key
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = apiKeyUpdateSchema.parse(body);
    
    const updatedKey = await prisma.apiKey.update({
      where: { id: params.id },
      data: validatedData,
    });
    if (!updatedKey) {
      return NextResponse.json(
        { error: 'Not Found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedKey);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    console.error("Error in PUT /api/keys/[id]:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE /api/keys/[id] - Delete API key
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedKey = await prisma.apiKey.delete({
      where: { id: params.id },
    });
    if (!deletedKey) {
      return NextResponse.json(
        { error: 'Not Found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'API key deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/keys/[id]:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
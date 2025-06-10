import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const apiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const keys = await prisma.apiKey.findMany();
    return NextResponse.json(keys);
  } catch (error) {
    console.error("Error in GET /api/keys:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = apiKeySchema.parse(body)
    
    const newKey = await prisma.apiKey.create({
      data: {
        name: validatedData.name,
      },
    });
    
    return NextResponse.json(newKey, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    console.error("Error in POST /api/keys:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 
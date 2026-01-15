import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { NormalizedTransaction } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const distributor = searchParams.get('distributor')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build query
    const query: any = {}
    
    if (search) {
      query.$or = [
        { distributor: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (distributor && distributor !== 'all') {
      query.distributor = distributor
    }
    
    if (startDate) {
      query.date = { ...query.date, $gte: new Date(startDate) }
    }
    
    if (endDate) {
      query.date = { ...query.date, $lte: new Date(endDate) }
    }

    const skip = (page - 1) * limit

    // Get total count
    const totalCount = await NormalizedTransaction.countDocuments(query)

    // Get transactions
    const transactions = await NormalizedTransaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadId', 'originalName')
      .lean()

    // Get unique distributors for filter
    const distributors = await NormalizedTransaction.distinct('distributor')

    return NextResponse.json({
      transactions,
      distributors,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Transactions error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

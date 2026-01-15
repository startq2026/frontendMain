import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { NormalizedTransaction } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'summary'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const distributor = searchParams.get('distributor')

    // Build query
    const query: any = { isValid: true }
    
    if (startDate) {
      query.date = { ...query.date, $gte: new Date(startDate) }
    }
    if (endDate) {
      query.date = { ...query.date, $lte: new Date(endDate) }
    }
    if (distributor && distributor !== 'all') {
      query.distributor = distributor
    }

    switch (type) {
      case 'summary': {
        // Get total revenue
        const totalRevenue = await NormalizedTransaction.aggregate([
          { $match: query },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ])

        // Get current month revenue
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const currentMonthRevenue = await NormalizedTransaction.aggregate([
          { 
            $match: { 
              ...query, 
              date: { $gte: currentMonthStart } 
            } 
          },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ])

        // Get current quarter revenue
        const currentQuarter = Math.floor(now.getMonth() / 3) + 1
        const quarterStartMonth = (currentQuarter - 1) * 3
        const quarterStart = new Date(now.getFullYear(), quarterStartMonth, 1)
        const quarterRevenue = await NormalizedTransaction.aggregate([
          { 
            $match: { 
              ...query, 
              date: { $gte: quarterStart } 
            } 
          },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ])

        // Get distributor count
        const distributorCount = await NormalizedTransaction.distinct('distributor', query)

        return NextResponse.json({
          totalRevenue: totalRevenue[0]?.total || 0,
          monthlyRevenue: currentMonthRevenue[0]?.total || 0,
          quarterlyRevenue: quarterRevenue[0]?.total || 0,
          distributorCount: distributorCount.length
        })
      }

      case 'monthly': {
        const monthlyData = await NormalizedTransaction.aggregate([
          { $match: query },
          {
            $group: {
              _id: { year: '$year', month: '$month' },
              revenue: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } },
          { $limit: 24 }
        ])

        return NextResponse.json({
          data: monthlyData.map(item => ({
            year: item._id.year,
            month: item._id.month,
            revenue: item.revenue,
            transactionCount: item.count
          }))
        })
      }

      case 'quarterly': {
        const quarterlyData = await NormalizedTransaction.aggregate([
          { $match: query },
          {
            $group: {
              _id: { year: '$year', quarter: '$quarter' },
              revenue: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.quarter': 1 } }
        ])

        return NextResponse.json({
          data: quarterlyData.map(item => ({
            year: item._id.year,
            quarter: item._id.quarter,
            revenue: item.revenue,
            transactionCount: item.count
          }))
        })
      }

      case 'distributors': {
        const distributorData = await NormalizedTransaction.aggregate([
          { $match: query },
          {
            $group: {
              _id: '$distributor',
              revenue: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { revenue: -1 } },
          { $limit: 20 }
        ])

        return NextResponse.json({
          data: distributorData.map(item => ({
            distributor: item._id,
            revenue: item.revenue,
            transactionCount: item.count
          }))
        })
      }

      case 'daily': {
        const dailyData = await NormalizedTransaction.aggregate([
          { $match: query },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              revenue: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id': -1 } },
          { $limit: 30 }
        ])

        return NextResponse.json({
          data: dailyData.map(item => ({
            date: item._id,
            revenue: item.revenue,
            transactionCount: item.count
          }))
        })
      }

      default:
        return NextResponse.json(
          { message: 'Invalid analytics type' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

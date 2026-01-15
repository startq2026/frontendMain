import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Upload, RawData, NormalizedTransaction } from '@/lib/models'
import { parseExcelFile, getQuarter } from '@/lib/excelParser'

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    
    if (!validTypes.includes(file.type) && !file.name.match(/\.(xls|xlsx)$/i)) {
      return NextResponse.json(
        { message: 'Invalid file type. Please upload .xls or .xlsx files.' },
        { status: 400 }
      )
    }

    // Check file size (10 MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 10 MB.' },
        { status: 400 }
      )
    }

    // Connect to database
    await dbConnect()

    // Create upload record
    const upload = await Upload.create({
      filename: `${Date.now()}-${file.name}`,
      originalName: file.name,
      fileSize: file.size,
      status: 'processing'
    })

    try {
      // Read file buffer
      const buffer = Buffer.from(await file.arrayBuffer())

      // Parse Excel file
      const parseResult = parseExcelFile(buffer)

      // Save raw data and normalized transactions
      let normalizedCount = 0
      const errors: string[] = []

      for (const sheet of parseResult.sheets) {
        for (const row of sheet.rows) {
          // Save raw data
          const rawData = await RawData.create({
            uploadId: upload._id,
            sheetName: sheet.sheetName,
            rowNumber: row.rowNumber,
            rawData: row.rawData
          })

          // Save normalized transaction if valid
          if (row.isValid && row.date && row.amount !== null && row.distributor) {
            const month = row.date.getMonth() + 1
            const year = row.date.getFullYear()

            await NormalizedTransaction.create({
              uploadId: upload._id,
              rawDataId: rawData._id,
              date: row.date,
              month,
              year,
              quarter: getQuarter(month),
              distributor: row.distributor,
              amount: row.amount,
              description: row.description,
              isValid: true,
              validationErrors: [],
              isDuplicate: false
            })

            normalizedCount++
          } else {
            // Save invalid transaction with errors
            if (row.date && row.distributor) {
              await NormalizedTransaction.create({
                uploadId: upload._id,
                rawDataId: rawData._id,
                date: row.date || new Date(),
                month: row.date ? row.date.getMonth() + 1 : 1,
                year: row.date ? row.date.getFullYear() : new Date().getFullYear(),
                quarter: 1,
                distributor: row.distributor || 'Unknown',
                amount: row.amount || 0,
                description: row.description,
                isValid: false,
                validationErrors: row.errors,
                isDuplicate: false
              })
            }
            
            if (row.errors.length > 0) {
              errors.push(`Row ${row.rowNumber}: ${row.errors.join(', ')}`)
            }
          }
        }
      }

      // Update upload record
      upload.status = errors.length > 0 ? 'partial' : 'completed'
      upload.sheetsProcessed = parseResult.sheets.length
      upload.rowsExtracted = parseResult.totalRows
      upload.rowsNormalized = normalizedCount
      upload.errors = errors.slice(0, 50) // Keep first 50 errors
      await upload.save()

      return NextResponse.json({
        success: true,
        uploadId: upload._id,
        filename: file.name,
        sheetsProcessed: parseResult.sheets.length,
        rowsProcessed: parseResult.totalRows,
        validRows: parseResult.validRows,
        invalidRows: parseResult.invalidRows,
        errors: errors.slice(0, 10) // Return first 10 errors
      })

    } catch (parseError) {
      // Update upload as failed
      upload.status = 'failed'
      upload.errors = [parseError instanceof Error ? parseError.message : 'Parsing failed']
      await upload.save()

      return NextResponse.json(
        { message: 'Failed to parse Excel file', error: parseError instanceof Error ? parseError.message : 'Unknown error' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Upload failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()

    const uploads = await Upload.find()
      .sort({ uploadedAt: -1 })
      .limit(20)
      .lean()

    return NextResponse.json({ uploads })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch uploads' },
      { status: 500 }
    )
  }
}

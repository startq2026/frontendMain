import * as XLSX from 'xlsx'

// Column name mappings for flexible Excel parsing
const COLUMN_MAPPINGS = {
  date: ['date', 'Date', 'DATE', 'तारीख', 'Invoice Date', 'Transaction Date', 'Bill Date'],
  amount: ['amount', 'Amount', 'AMOUNT', 'Total', 'Revenue', 'Value', 'Sale Amount', 'Net Amount', 'रकम'],
  distributor: ['distributor', 'Distributor', 'DISTRIBUTOR', 'Dealer', 'Name', 'Party', 'Customer', 'वितरक'],
  description: ['description', 'Description', 'Details', 'Particulars', 'Item', 'Product']
}

export interface ParsedRow {
  date: Date | null
  amount: number | null
  distributor: string | null
  description: string | null
  rawData: Record<string, any>
  rowNumber: number
  isValid: boolean
  errors: string[]
}

export interface ParsedSheet {
  sheetName: string
  rows: ParsedRow[]
  headerRow: number
  headers: string[]
}

export interface ParseResult {
  sheets: ParsedSheet[]
  totalRows: number
  validRows: number
  invalidRows: number
  errors: string[]
}

function findColumn(headers: string[], mappings: string[]): number {
  for (const mapping of mappings) {
    const index = headers.findIndex(
      h => h && h.toString().toLowerCase().trim() === mapping.toLowerCase().trim()
    )
    if (index !== -1) return index
  }
  return -1
}

function parseDate(value: any): Date | null {
  if (!value) return null

  // If it's already a Date
  if (value instanceof Date) return value

  // If it's an Excel serial number
  if (typeof value === 'number') {
    const date = XLSX.SSF.parse_date_code(value)
    if (date) {
      return new Date(date.y, date.m - 1, date.d)
    }
  }

  // Try parsing string formats
  if (typeof value === 'string') {
    const parsed = new Date(value)
    if (!isNaN(parsed.getTime())) return parsed

    // Try DD/MM/YYYY format (common in India)
    const ddmmyyyy = value.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
    if (ddmmyyyy) {
      return new Date(parseInt(ddmmyyyy[3]), parseInt(ddmmyyyy[2]) - 1, parseInt(ddmmyyyy[1]))
    }
  }

  return null
}

function parseAmount(value: any): number | null {
  if (value === null || value === undefined || value === '') return null

  if (typeof value === 'number') return value

  if (typeof value === 'string') {
    // Remove currency symbols and commas
    const cleaned = value.replace(/[₹$,\s]/g, '')
    const parsed = parseFloat(cleaned)
    if (!isNaN(parsed)) return parsed
  }

  return null
}

function detectHeaderRow(sheet: XLSX.WorkSheet): { rowIndex: number; headers: string[] } {
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1')
  
  // Check first 10 rows for headers
  for (let r = range.s.r; r <= Math.min(range.s.r + 10, range.e.r); r++) {
    const rowData: string[] = []
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ r, c })]
      rowData.push(cell ? String(cell.v || '') : '')
    }

    // Check if this row contains likely headers
    const hasDateCol = findColumn(rowData, COLUMN_MAPPINGS.date) !== -1
    const hasAmountCol = findColumn(rowData, COLUMN_MAPPINGS.amount) !== -1
    const hasDistributorCol = findColumn(rowData, COLUMN_MAPPINGS.distributor) !== -1

    if (hasDateCol || hasAmountCol || hasDistributorCol) {
      return { rowIndex: r, headers: rowData }
    }
  }

  // Default to first row
  const firstRowData: string[] = []
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: range.s.r, c })]
    firstRowData.push(cell ? String(cell.v || '') : '')
  }
  return { rowIndex: range.s.r, headers: firstRowData }
}

function isEmptyOrTotalRow(row: any[]): boolean {
  // Check if row is empty
  const nonEmptyCells = row.filter(cell => cell !== null && cell !== undefined && cell !== '')
  if (nonEmptyCells.length === 0) return true

  // Check for total/summary keywords
  const totalKeywords = ['total', 'sum', 'grand total', 'subtotal', 'कुल', 'योग']
  const firstCell = String(row[0] || '').toLowerCase().trim()
  if (totalKeywords.some(kw => firstCell.includes(kw))) return true

  return false
}

export function parseExcelFile(buffer: Buffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true })
  const result: ParseResult = {
    sheets: [],
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
    errors: []
  }

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName]
    const { rowIndex: headerRowIndex, headers } = detectHeaderRow(sheet)

    // Find column indices
    const dateColIndex = findColumn(headers, COLUMN_MAPPINGS.date)
    const amountColIndex = findColumn(headers, COLUMN_MAPPINGS.amount)
    const distributorColIndex = findColumn(headers, COLUMN_MAPPINGS.distributor)
    const descriptionColIndex = findColumn(headers, COLUMN_MAPPINGS.description)

    // Convert sheet to JSON starting after header row
    const jsonData = XLSX.utils.sheet_to_json(sheet, { 
      header: 1,
      range: headerRowIndex + 1,
      raw: false,
      dateNF: 'yyyy-mm-dd'
    }) as any[][]

    const parsedRows: ParsedRow[] = []

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i]
      
      // Skip empty or total rows
      if (isEmptyOrTotalRow(row)) continue

      const errors: string[] = []
      
      // Extract values
      const dateValue = dateColIndex !== -1 ? row[dateColIndex] : null
      const amountValue = amountColIndex !== -1 ? row[amountColIndex] : null
      const distributorValue = distributorColIndex !== -1 ? row[distributorColIndex] : null
      const descriptionValue = descriptionColIndex !== -1 ? row[descriptionColIndex] : null

      // Parse values
      const date = parseDate(dateValue)
      const amount = parseAmount(amountValue)
      const distributor = distributorValue ? String(distributorValue).trim() : null
      const description = descriptionValue ? String(descriptionValue).trim() : null

      // Validate mandatory fields
      if (!date) errors.push('Invalid or missing date')
      if (amount === null || isNaN(amount)) errors.push('Invalid or missing amount')
      if (!distributor) errors.push('Missing distributor')

      // Build raw data object
      const rawData: Record<string, any> = {}
      headers.forEach((header, idx) => {
        if (header && row[idx] !== undefined) {
          rawData[header] = row[idx]
        }
      })

      const parsedRow: ParsedRow = {
        date,
        amount,
        distributor,
        description,
        rawData,
        rowNumber: headerRowIndex + i + 2, // +2 for 1-indexed and header row
        isValid: errors.length === 0,
        errors
      }

      parsedRows.push(parsedRow)
      result.totalRows++
      
      if (parsedRow.isValid) {
        result.validRows++
      } else {
        result.invalidRows++
      }
    }

    result.sheets.push({
      sheetName,
      rows: parsedRows,
      headerRow: headerRowIndex,
      headers
    })
  }

  return result
}

export function getQuarter(month: number): number {
  if (month >= 1 && month <= 3) return 4 // Q4 (Jan-Mar in Indian FY)
  if (month >= 4 && month <= 6) return 1 // Q1 (Apr-Jun)
  if (month >= 7 && month <= 9) return 2 // Q2 (Jul-Sep)
  return 3 // Q3 (Oct-Dec)
}

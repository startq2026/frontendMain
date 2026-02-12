import mongoose, { Schema, Document, Model } from 'mongoose'

// Upload Metadata Schema
export interface IUpload extends Document {
  filename: string
  originalName: string
  uploadedAt: Date
  uploadedBy: string
  fileSize: number
  status: 'processing' | 'completed' | 'failed' | 'partial'
  sheetsProcessed: number
  rowsExtracted: number
  rowsNormalized: number
  processingErrors: string[]
}

const UploadSchema = new Schema<IUpload>({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, default: 'system' },
  fileSize: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['processing', 'completed', 'failed', 'partial'],
    default: 'processing'
  },
  sheetsProcessed: { type: Number, default: 0 },
  rowsExtracted: { type: Number, default: 0 },
  rowsNormalized: { type: Number, default: 0 },
  processingErrors: [{ type: String }]
}, {
  timestamps: true
})

// Raw Data Schema - stores data exactly as extracted from Excel
export interface IRawData extends Document {
  uploadId: mongoose.Types.ObjectId
  sheetName: string
  rowNumber: number
  rawData: Record<string, any>
  extractedAt: Date
}

const RawDataSchema = new Schema<IRawData>({
  uploadId: { type: Schema.Types.ObjectId, ref: 'Upload', required: true },
  sheetName: { type: String, required: true },
  rowNumber: { type: Number, required: true },
  rawData: { type: Schema.Types.Mixed, required: true },
  extractedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Normalized Transaction Schema - analytics-ready data
export interface INormalizedTransaction extends Document {
  uploadId: mongoose.Types.ObjectId
  rawDataId: mongoose.Types.ObjectId
  date: Date
  month: number
  year: number
  quarter: number
  distributor: string
  amount: number
  description?: string
  isValid: boolean
  validationErrors: string[]
  isDuplicate: boolean
}

const NormalizedTransactionSchema = new Schema<INormalizedTransaction>({
  uploadId: { type: Schema.Types.ObjectId, ref: 'Upload', required: true },
  rawDataId: { type: Schema.Types.ObjectId, ref: 'RawData', required: true },
  date: { type: Date, required: true },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
  quarter: { type: Number, required: true, min: 1, max: 4 },
  distributor: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  description: { type: String },
  isValid: { type: Boolean, default: true },
  validationErrors: [{ type: String }],
  isDuplicate: { type: Boolean, default: false }
}, {
  timestamps: true
})

// Create indexes for analytics queries
NormalizedTransactionSchema.index({ date: 1 })
NormalizedTransactionSchema.index({ year: 1, month: 1 })
NormalizedTransactionSchema.index({ year: 1, quarter: 1 })
NormalizedTransactionSchema.index({ distributor: 1, date: 1 })
NormalizedTransactionSchema.index({ isValid: 1 })

// Export models
export const Upload: Model<IUpload> = 
  mongoose.models.Upload || mongoose.model<IUpload>('Upload', UploadSchema)

export const RawData: Model<IRawData> = 
  mongoose.models.RawData || mongoose.model<IRawData>('RawData', RawDataSchema)

export const NormalizedTransaction: Model<INormalizedTransaction> = 
  mongoose.models.NormalizedTransaction || 
  mongoose.model<INormalizedTransaction>('NormalizedTransaction', NormalizedTransactionSchema)

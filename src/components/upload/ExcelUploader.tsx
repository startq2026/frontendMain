"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface UploadedFile {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  message?: string;
}

export default function ExcelUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xls|xlsx)$/i)) {
      return {
        valid: false,
        message: "Invalid file type. Please upload .xls or .xlsx files.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        message: "File too large. Maximum size is 10 MB.",
      };
    }

    return { valid: true };
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);
    const uploadedFiles: UploadedFile[] = fileArray.map((file) => {
      const validation = validateFile(file);
      return {
        file,
        status: validation.valid ? "pending" : "error",
        progress: 0,
        message: validation.message,
      };
    });

    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (index: number) => {
    const fileItem = files[index];
    if (fileItem.status !== "pending") return;

    // Update status to uploading
    setFiles((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, status: "uploading", progress: 0 } : f,
      ),
    );

    try {
      const formData = new FormData();
      formData.append("file", fileItem.file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const result = await response.json();

      setFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: "success",
                progress: 100,
                message: `Processed ${result.rowsProcessed || 0} rows`,
              }
            : f,
        ),
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: "error",
                message:
                  error instanceof Error ? error.message : "Upload failed",
              }
            : f,
        ),
      );
    }
  };

  const uploadAll = async () => {
    const pendingIndices = files
      .map((f, i) => (f.status === "pending" ? i : -1))
      .filter((i) => i !== -1);

    for (const index of pendingIndices) {
      await uploadFile(index);
    }
  };

  const pendingCount = files.filter((f) => f.status === "pending").length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Excel Files
      </h2>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${
            isDragging
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <input
          type="file"
          accept=".xls,.xlsx"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center">
          <div
            className={`
            w-16 h-16 rounded-full flex items-center justify-center mb-4
            ${isDragging ? "bg-primary-100" : "bg-gray-100"}
          `}
          >
            <Upload
              className={`w-8 h-8 ${isDragging ? "text-primary-600" : "text-gray-400"}`}
            />
          </div>

          <p className="text-lg font-medium text-gray-700 mb-1">
            {isDragging ? "Drop files here" : "Drag & drop Excel files"}
          </p>
          <p className="text-sm text-gray-500">
            or <span className="text-primary-600 font-medium">browse</span> to
            select files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports .xls and .xlsx • Max 10 MB per file
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Files ({files.length})
            </h3>
            {pendingCount > 0 && (
              <button
                onClick={uploadAll}
                className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg
                         hover:bg-primary-600 transition-colors"
              >
                Upload All ({pendingCount})
              </button>
            )}
          </div>

          <div className="space-y-2">
            {files.map((fileItem, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border
                  ${
                    fileItem.status === "error"
                      ? "bg-red-50 border-red-200"
                      : fileItem.status === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                  }
                `}
              >
                <FileSpreadsheet
                  className={`
                  w-8 h-8 flex-shrink-0
                  ${
                    fileItem.status === "error"
                      ? "text-red-500"
                      : fileItem.status === "success"
                        ? "text-green-500"
                        : "text-green-600"
                  }
                `}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileItem.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(fileItem.file.size / 1024).toFixed(1)} KB
                    {fileItem.message && (
                      <span
                        className={`ml-2 ${fileItem.status === "error" ? "text-red-600" : "text-green-600"}`}
                      >
                        • {fileItem.message}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {fileItem.status === "pending" && (
                    <button
                      onClick={() => uploadFile(index)}
                      className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded
                               hover:bg-primary-600 transition-colors"
                    >
                      Upload
                    </button>
                  )}

                  {fileItem.status === "uploading" && (
                    <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                  )}

                  {fileItem.status === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}

                  {fileItem.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}

                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

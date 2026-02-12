"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Cloud,
  FileCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface UploadedFile {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  message?: string;
}

export default function ExcelUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { addToast } = useToast();

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
      if (!validation.valid) {
        addToast({ title: validation.message || "Invalid file", type: "error" });
      }
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

    // Update status to uploading with simulated progress
    setFiles((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, status: "uploading", progress: 0 } : f,
      ),
    );

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index && f.status === "uploading" && f.progress < 90
            ? { ...f, progress: f.progress + 10 }
            : f,
        ),
      );
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", fileItem.file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

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
      addToast({ title: "File uploaded successfully", type: "success" });
    } catch (error) {
      clearInterval(progressInterval);
      const errorMessage = error instanceof Error ? error.message : "Upload failed";
      setFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: "error",
                progress: 0,
                message: errorMessage,
              }
            : f,
        ),
      );
      addToast({ title: errorMessage, type: "error" });
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
  const successCount = files.filter((f) => f.status === "success").length;

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getFileItemClasses = (status: UploadedFile["status"]) => {
    const base = "flex items-center gap-3 p-4 rounded-xl border transition-all duration-200";
    switch (status) {
      case "error":
        return `${base} bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800`;
      case "success":
        return `${base} bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800`;
      case "uploading":
        return `${base} bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800`;
      default:
        return `${base} bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 rounded-xl flex items-center justify-center">
          <Cloud className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upload Excel Files
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Import your sales data
          </p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${
            isDragging
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700/30"
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
            w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
            ${
              isDragging
                ? "bg-primary-100 dark:bg-primary-800/50 scale-110 rotate-3"
                : "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800"
            }
          `}
          >
            <Upload
              className={`w-10 h-10 transition-colors ${
                isDragging ? "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </div>

          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
            {isDragging ? "Drop files here" : "Drag & drop Excel files"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or{" "}
            <span className="text-primary-600 dark:text-primary-400 font-semibold hover:underline cursor-pointer">
              browse
            </span>{" "}
            to select files
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <FileSpreadsheet className="w-4 h-4" />
              .xls, .xlsx
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Max 10 MB per file
            </span>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Files ({files.length})
              </h3>
              {successCount > 0 && (
                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  <FileCheck className="w-3 h-3" />
                  {successCount} uploaded
                </span>
              )}
            </div>
            {pendingCount > 0 && (
              <button
                onClick={uploadAll}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl
                         hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40
                         flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload All ({pendingCount})
              </button>
            )}
          </div>

          <div className="space-y-3">
            {files.map((fileItem, index) => (
              <div key={index} className={getFileItemClasses(fileItem.status)}>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${
                      fileItem.status === "error"
                        ? "bg-red-100 dark:bg-red-900/30"
                        : fileItem.status === "success"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-green-50 dark:bg-green-900/20"
                    }
                  `}
                >
                  <FileSpreadsheet
                    className={`w-6 h-6
                      ${
                        fileItem.status === "error"
                          ? "text-red-500"
                          : fileItem.status === "success"
                            ? "text-green-500"
                            : "text-green-600 dark:text-green-400"
                      }
                    `}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {fileItem.file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(fileItem.file.size / 1024).toFixed(1)} KB
                    </p>
                    {fileItem.message && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <p
                          className={`text-xs ${
                            fileItem.status === "error"
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {fileItem.message}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {fileItem.status === "uploading" && (
                    <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-300"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {fileItem.status === "pending" && (
                    <button
                      onClick={() => uploadFile(index)}
                      className="px-3 py-1.5 bg-primary-500 text-white text-xs font-medium rounded-lg
                               hover:bg-primary-600 transition-colors shadow-sm"
                    >
                      Upload
                    </button>
                  )}

                  {getStatusIcon(fileItem.status)}

                  <button
                    onClick={() => removeFile(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove file"
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

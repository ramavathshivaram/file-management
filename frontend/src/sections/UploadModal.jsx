import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Upload,
  FileUp,
  FolderUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

export function UploadModal({ onClose }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const simulateUpload = async (file) => {
    const totalSteps = 100;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                progress: i,
                status: i === 100 ? "completed" : "uploading",
              }
            : f
        )
      );
    }
  };

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(true);

    // Simulate upload for each file
    newFiles.forEach((file) => {
      simulateUpload(file);
    });
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFiles(selectedFiles);
      }
    },
    [handleFiles]
  );

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const totalProgress =
    files.length > 0
      ? files.reduce((sum, file) => sum + file.progress, 0) / files.length
      : 0;

  const completedFiles = files.filter((f) => f.status === "completed").length;
  const errorFiles = files.filter((f) => f.status === "error").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold">Upload Files</h2>
            {files.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {completedFiles} of {files.length} files uploaded
                {errorFiles > 0 && ` • ${errorFiles} failed`}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Upload Area */}
        <div className="p-6">
          <motion.div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            animate={{
              borderColor: isDragOver ? "rgb(59 130 246)" : "rgb(229 231 235)",
              backgroundColor: isDragOver
                ? "rgb(59 130 246 / 0.05)"
                : "transparent",
            }}
          >
            <motion.div
              animate={{
                scale: isDragOver ? 1.1 : 1,
                rotate: isDragOver ? 5 : 0,
              }}
              transition={{ type: "spring", damping: 15 }}
            >
              <Upload
                size={48}
                className="mx-auto mb-4 text-muted-foreground"
              />
            </motion.div>

            <h3 className="text-lg font-medium mb-2">
              {isDragOver
                ? "Drop files here"
                : "Choose files or drag them here"}
            </h3>
            <p className="text-muted-foreground mb-4">
              Support for single or bulk uploads. Strictly prohibited to upload
              company data containing PII.
            </p>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <FileUp size={16} className="mr-2" />
                Choose Files
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("folder-input")?.click()}
              >
                <FolderUp size={16} className="mr-2" />
                Choose Folder
              </Button>
            </div>

            <input
              id="file-input"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <input
              id="folder-input"
              type="file"
              webkitdirectory
              className="hidden"
              onChange={handleFileInput}
            />
          </motion.div>

          {/* Upload Progress */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
              >
                {/* Overall Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(totalProgress)}%
                    </span>
                  </div>
                  <Progress value={totalProgress} className="h-2" />
                </div>

                {/* File List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {files.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {file.status === "completed" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                          >
                            <CheckCircle size={20} className="text-green-500" />
                          </motion.div>
                        )}
                        {file.status === "error" && (
                          <AlertCircle size={20} className="text-destructive" />
                        )}
                        {file.status === "uploading" && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Upload size={20} className="text-primary" />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {formatFileSize(file.size)}
                            </Badge>
                            {file.status !== "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="p-1 h-auto"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        </div>

                        {file.status === "uploading" && (
                          <Progress value={file.progress} className="h-1" />
                        )}

                        {file.status === "error" && file.error && (
                          <p className="text-xs text-destructive">
                            {file.error}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={files.length === 0 || isUploading}
            onClick={onClose}
          >
            {isUploading ? "Uploading..." : "Done"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

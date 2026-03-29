"use client";

import { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/app/components/I18nProvider";

interface ReceiptUploadProps {
  onChange: (filePath: string | null) => void;
  value?: string | null;
  disabled?: boolean;
  directory?: string;
}

export function ReceiptUpload({
  onChange,
  value,
  disabled = false,
  directory = "finance-receipts",
}: ReceiptUploadProps) {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFileUrl = (filePath: string) => {
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${filePath}`;
  };

  const getFileName = (filePath: string) => {
    const parts = filePath.split("/");
    return parts[parts.length - 1] || filePath;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/files/${directory}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("upload.errors.failed", "Failed to upload file"));
      }

      onChange(data.filePath);
    } catch (err) {
      console.error("Receipt upload error:", err);
      setError(err instanceof Error ? err.message : t("upload.errors.failed", "Failed to upload file"));
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
      {value ? (
        <div className="flex items-center justify-between rounded-md border p-3">
          <a
            href={getFileUrl(value)}
            target="_blank"
            rel="noreferrer"
            className="truncate text-sm text-primary underline"
          >
            {getFileName(value)}
          </a>
          <Button type="button" variant="destructive" size="icon" onClick={() => onChange(null)} disabled={disabled || isUploading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={disabled || isUploading}>
          <Paperclip className="mr-2 h-4 w-4" />
          {isUploading
            ? t("finance.expenses.uploadingReceipt", "Uploading receipt...")
            : t("finance.expenses.uploadReceipt", "Upload receipt")}
        </Button>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

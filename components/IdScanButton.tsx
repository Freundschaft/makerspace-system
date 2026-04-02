"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseIdScanText } from "@/lib/id-ocr";

let workerPromise: Promise<any> | null = null;

async function getWorker() {
  if (!workerPromise) {
    workerPromise = import("tesseract.js").then((module) => {
      const createWorker =
        module.createWorker ?? module.default?.createWorker;

      if (!createWorker) {
        throw new Error("Tesseract worker could not be initialized.");
      }

      return createWorker(["eng", "ell"]);
    });
  }

  return workerPromise;
}

interface IdScanButtonProps {
  label: string;
  scanningLabel: string;
  helpText?: string;
  errorText: string;
  onScanResult: (result: {
    name?: string | null;
    idNumber?: string | null;
    rawText: string;
  }) => void;
}

export function IdScanButton({
  label,
  scanningLabel,
  helpText,
  errorText,
  onScanResult,
}: IdScanButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState<string | null>(helpText ?? null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsScanning(true);
    setMessage(null);

    try {
      const worker = await getWorker();
      const result = await worker.recognize(file);
      const text = String(result?.data?.text ?? "");
      const parsed = parseIdScanText(text);

      onScanResult(parsed);
      setMessage(parsed.name || parsed.idNumber ? null : errorText);
    } catch (error) {
      console.error("Error scanning ID locally:", error);
      setMessage(errorText);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={isScanning}
        className="w-full sm:w-auto"
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {scanningLabel}
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            {label}
          </>
        )}
      </Button>
      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
    </div>
  );
}

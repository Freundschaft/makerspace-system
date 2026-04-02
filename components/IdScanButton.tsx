"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, ChevronDown, Loader2 } from "lucide-react";
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
  debugTitle?: string;
  rawTextLabel?: string;
  confidenceLabel?: string;
  detectedNameLabel?: string;
  detectedIdLabel?: string;
  imagePreviewLabel?: string;
  candidateLinesLabel?: string;
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
  debugTitle = "Scan debug",
  rawTextLabel = "Raw OCR text",
  confidenceLabel = "Confidence",
  detectedNameLabel = "Detected name",
  detectedIdLabel = "Detected ID number",
  imagePreviewLabel = "Captured image",
  candidateLinesLabel = "OCR lines",
  onScanResult,
}: IdScanButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState<string | null>(helpText ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<{
    confidence: number | null;
    rawText: string;
    name: string | null;
    idNumber: string | null;
    candidateLines: string[];
  } | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsScanning(true);
    setMessage(null);
    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return nextPreviewUrl;
    });

    try {
      const worker = await getWorker();
      const result = await worker.recognize(file);
      const text = String(result?.data?.text ?? "");
      const parsed = parseIdScanText(text);
      const confidence =
        typeof result?.data?.confidence === "number"
          ? result.data.confidence
          : null;

      onScanResult(parsed);
      setDebugData({
        confidence,
        rawText: parsed.rawText,
        name: parsed.name,
        idNumber: parsed.idNumber,
        candidateLines: parsed.candidateLines,
      });
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
      {(previewUrl || debugData) ? (
        <details className="rounded-lg border bg-card/60">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium">
            <span>{debugTitle}</span>
            <ChevronDown className="h-4 w-4" />
          </summary>
          <div className="space-y-4 border-t px-4 py-4">
            {previewUrl ? (
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {imagePreviewLabel}
                </p>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted/40">
                  <Image
                    src={previewUrl}
                    alt={imagePreviewLabel}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}
            {debugData ? (
              <>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border bg-background/70 p-3">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {confidenceLabel}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {debugData.confidence === null
                        ? "—"
                        : `${Math.round(debugData.confidence)}%`}
                    </p>
                  </div>
                  <div className="rounded-md border bg-background/70 p-3">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {detectedNameLabel}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {debugData.name ?? "—"}
                    </p>
                  </div>
                  <div className="rounded-md border bg-background/70 p-3">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {detectedIdLabel}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {debugData.idNumber ?? "—"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {candidateLinesLabel}
                  </p>
                  <div className="rounded-md border bg-background/70 p-3 text-sm">
                    {debugData.candidateLines.length > 0 ? (
                      <ul className="space-y-1">
                        {debugData.candidateLines.map((line, index) => (
                          <li key={`${index}-${line}`}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {rawTextLabel}
                  </p>
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border bg-background/70 p-3 text-xs">
                    {debugData.rawText || "—"}
                  </pre>
                </div>
              </>
            ) : null}
          </div>
        </details>
      ) : null}
    </div>
  );
}

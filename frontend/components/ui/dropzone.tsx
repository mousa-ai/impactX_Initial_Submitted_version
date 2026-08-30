"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function Dropzone({
  accept,
  maxSize,
  disabled,
  onFile,
}: {
  accept: string[];
  maxSize: number;
  disabled?: boolean;
  onFile: (file: File) => void;
}) {
  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) onFile(files[0]);
    },
    [onFile],
  );

  const { t } = useLocale();
  const mb = Math.round(maxSize / (1024 * 1024));
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    maxFiles: 1,
    maxSize,
    accept: Object.fromEntries(accept.map((type) => [type, []])),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer rounded-card border border-dashed border-line bg-canvas/60 px-5 py-8 text-center transition-all",
        isDragActive && "border-gold bg-gold-soft/50",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
      <p className="mt-3 text-sm font-medium">
        {t("Drop a file or click to upload", "اسحب ملفاً أو اضغط للرفع")}
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        {accept.join(", ")} · {t(`up to ${mb}MB`, `حتى ${mb} م.ب`)}
      </p>
    </div>
  );
}

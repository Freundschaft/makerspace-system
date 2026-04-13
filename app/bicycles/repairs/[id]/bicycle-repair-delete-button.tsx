"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { localizePathname, type Locale } from "@/lib/i18n/config";

type BicycleRepairDeleteButtonProps = {
  repairId: string;
  locale: Locale;
  label: string;
  deletingLabel: string;
  confirmMessage: string;
  errorMessage: string;
};

export function BicycleRepairDeleteButton({
  repairId,
  locale,
  label,
  deletingLabel,
  confirmMessage,
  errorMessage,
}: BicycleRepairDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting || !window.confirm(confirmMessage)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/bicycles/repairs/${repairId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      router.push(localizePathname("/bicycles/repairs", locale));
      router.refresh();
    } catch (error) {
      console.error("Error deleting bicycle repair:", error);
      window.alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button variant="destructive" onClick={() => void handleDelete()} disabled={isDeleting}>
      <Trash className="mr-2 h-4 w-4" />
      {isDeleting ? deletingLabel : label}
    </Button>
  );
}

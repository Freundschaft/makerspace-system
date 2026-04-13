"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RepairStatus = "PENDING" | "IN_PROGRESS" | "WAITING_FOR_PARTS" | "COMPLETED" | "PICKED_UP" | "CANCELLED";

type RepairStatusSelectProps = {
  repairId: string;
  value: RepairStatus;
  labels: Record<RepairStatus, string>;
  onUpdated?: (status: RepairStatus) => void;
};

export function RepairStatusSelect({ repairId, value, labels, onUpdated }: RepairStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState<RepairStatus>(value);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (nextStatus: string) => {
    const normalizedStatus = nextStatus as RepairStatus;
    const previousStatus = status;

    if (normalizedStatus === previousStatus || isUpdating) {
      return;
    }

    setStatus(normalizedStatus);

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/bicycles/repairs/${repairId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: normalizedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update repair status");
      }

      onUpdated?.(normalizedStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating bicycle repair status:", error);
      setStatus(previousStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select value={status} onValueChange={(nextStatus) => void handleStatusChange(nextStatus)} disabled={isUpdating}>
      <SelectTrigger
        className="h-8 w-[180px]"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <SelectItem value="PENDING">{labels.PENDING}</SelectItem>
        <SelectItem value="IN_PROGRESS">{labels.IN_PROGRESS}</SelectItem>
        <SelectItem value="WAITING_FOR_PARTS">{labels.WAITING_FOR_PARTS}</SelectItem>
        <SelectItem value="COMPLETED">{labels.COMPLETED}</SelectItem>
        <SelectItem value="PICKED_UP">{labels.PICKED_UP}</SelectItem>
        <SelectItem value="CANCELLED">{labels.CANCELLED}</SelectItem>
      </SelectContent>
    </Select>
  );
}

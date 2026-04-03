"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BudgetFormData = {
  id?: string;
  name: string;
  allocatedAmount: string;
  periodLabel: string;
  notes: string;
};

export function BudgetForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: BudgetFormData;
}) {
  const router = useRouter();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const submitLockRef = useRef(false);
  const [formData, setFormData] = useState<BudgetFormData>(
    initialData || {
      name: "",
      allocatedAmount: "",
      periodLabel: "",
      notes: "",
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLockRef.current) {
      return;
    }
    submitLockRef.current = true;
    setIsSubmitting(true);
    try {
      const endpoint = mode === "create" ? "/api/budgets" : `/api/budgets/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save budget");
      router.push("/finance");
      router.refresh();
    } catch (error) {
      console.error("Error saving budget:", error);
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/budgets/${initialData.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete budget");
      router.push("/finance");
      router.refresh();
    } catch (error) {
      console.error("Error deleting budget:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            {mode === "create"
              ? t("finance.budgets.new.title", "New Budget")
              : t("finance.budgets.edit.title", "Edit Budget")}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? t("finance.budgets.new.description", "Create a budget bucket for upcoming expenses.")
              : t("finance.budgets.edit.description", "Update this budget and keep its expense links intact.")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("finance.budgets.fields.name", "Budget")} *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allocatedAmount">{t("finance.budgets.fields.allocatedAmount", "Allocated (€)")} *</Label>
              <Input id="allocatedAmount" name="allocatedAmount" type="number" step="0.01" value={formData.allocatedAmount} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodLabel">{t("finance.budgets.fields.periodLabel", "Period")}</Label>
              <Input id="periodLabel" name="periodLabel" value={formData.periodLabel} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">{t("common.notes", "Notes")}</Label>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {mode === "edit" && (
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? t("common.deleting", "Deleting...") : t("common.delete", "Delete")}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/finance")}>
                {t("common.cancel", "Cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("common.saving", "Saving...")
                  : mode === "create"
                    ? t("finance.budgets.new.submit", "Create Budget")
                    : t("common.update", "Update")}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

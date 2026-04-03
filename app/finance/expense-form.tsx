"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReceiptUpload } from "@/components/ui/receipt-upload";

type BudgetOption = { id: string; name: string };
type ContextOption = {
  carpentryProjectId?: string | null;
  houseProjectId?: string | null;
  contextLabel?: string | null;
};

type ExpenseFormData = {
  id?: string;
  date: string;
  title: string;
  vendor: string;
  amount: string;
  budgetId: string;
  notes: string;
  receiptUrl: string;
  carpentryProjectId: string;
  houseProjectId: string;
};

export function ExpenseForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: ExpenseFormData;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const submitLockRef = useRef(false);
  const [budgets, setBudgets] = useState<BudgetOption[]>([]);
  const contextDefaults = useMemo<ContextOption>(() => ({
    carpentryProjectId: searchParams.get("carpentryProjectId"),
    houseProjectId: searchParams.get("houseProjectId"),
    contextLabel: searchParams.get("contextLabel"),
  }), [searchParams]);

  const [formData, setFormData] = useState<ExpenseFormData>(
    initialData || {
      date: new Date().toISOString().slice(0, 10),
      title: searchParams.get("title") || "",
      vendor: "",
      amount: "",
      budgetId: "",
      notes: "",
      receiptUrl: "",
      carpentryProjectId: contextDefaults.carpentryProjectId || "",
      houseProjectId: contextDefaults.houseProjectId || "",
    },
  );

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/budgets");
        if (!response.ok) return;
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
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
      const endpoint = mode === "create" ? "/api/expenses" : `/api/expenses/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save expense");
      router.push("/finance");
      router.refresh();
    } catch (error) {
      console.error("Error saving expense:", error);
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/expenses/${initialData.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete expense");
      router.push("/finance");
      router.refresh();
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const sourceLabel = contextDefaults.contextLabel
    || (formData.carpentryProjectId ? t("finance.expenses.source.carpentry", "Linked to carpentry project") : "")
    || (formData.houseProjectId ? t("finance.expenses.source.houseProject", "Linked to house project") : "");

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            {mode === "create"
              ? t("finance.expenses.new.title", "New Expense")
              : t("finance.expenses.edit.title", "Edit Expense")}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? t("finance.expenses.new.description", "Log a purchase so it is tracked in the system.")
              : t("finance.expenses.edit.description", "Update this expense entry.")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {sourceLabel && (
              <div className="rounded-md border bg-muted/20 p-3 text-sm">
                {sourceLabel}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="date">{t("finance.expenses.fields.date", "Date")} *</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">{t("finance.expenses.fields.title", "Expense")} *</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor">{t("finance.expenses.fields.vendor", "Vendor")}</Label>
              <Input id="vendor" name="vendor" value={formData.vendor} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">{t("finance.expenses.fields.amount", "Amount (€)")} *</Label>
              <Input id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetId">{t("finance.expenses.fields.budget", "Budget")}</Label>
              <select id="budgetId" name="budgetId" value={formData.budgetId} onChange={handleChange} className="w-full rounded-md border bg-background px-3 py-2">
                <option value="">{t("finance.expenses.placeholders.noBudget", "No budget")}</option>
                {budgets.map((budget) => (
                  <option key={budget.id} value={budget.id}>{budget.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>{t("finance.expenses.fields.receiptUrl", "Receipt")}</Label>
              <ReceiptUpload value={formData.receiptUrl || null} onChange={(value) => setFormData((prev) => ({ ...prev, receiptUrl: value || "" }))} />
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
                    ? t("finance.expenses.new.submit", "Create Expense")
                    : t("common.update", "Update")}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

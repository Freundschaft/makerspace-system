import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExpenseForm } from "@/app/finance/expense-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExpensePage({ params }: PageProps) {
  const { id } = await params;
  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense) {
    notFound();
  }

  return (
    <ExpenseForm
      mode="edit"
      initialData={{
        id: expense.id,
        date: new Date(expense.date).toISOString().slice(0, 10),
        title: expense.title,
        vendor: expense.vendor || "",
        amount: String(expense.amount),
        budgetId: expense.budgetId || "",
        notes: expense.notes || "",
        receiptUrl: expense.receiptUrl || "",
        carpentryProjectId: expense.carpentryProjectId || "",
        houseProjectId: expense.houseProjectId || "",
      }}
    />
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BudgetForm } from "@/app/finance/budget-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBudgetPage({ params }: PageProps) {
  const { id } = await params;
  const budget = await prisma.budget.findUnique({
    where: { id },
  });

  if (!budget) {
    notFound();
  }

  return (
    <BudgetForm
      mode="edit"
      initialData={{
        id: budget.id,
        name: budget.name,
        allocatedAmount: String(budget.allocatedAmount),
        periodLabel: budget.periodLabel || "",
        notes: budget.notes || "",
      }}
    />
  );
}

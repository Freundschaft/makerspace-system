import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetTable } from "./budget-table";
import { ExpenseTable } from "./expense-table";

export default async function FinancePage() {
  const { t } = await getServerI18n();
  const [budgets, expenses] = await Promise.all([
    prisma.budget.findMany({
      include: { expenses: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.expense.findMany({
      include: { budget: true, createdBy: true, carpentryProject: true, houseProject: true },
      orderBy: { date: "desc" },
    }),
  ]);

  const budgetRows = budgets.map((budget) => {
    const spentAmount = budget.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    return {
      id: budget.id,
      name: budget.name,
      allocatedAmount: budget.allocatedAmount,
      spentAmount,
      remainingAmount: Number(budget.allocatedAmount) - spentAmount,
      periodLabel: budget.periodLabel,
      createdAt: budget.createdAt,
    };
  });

  const totalAllocated = budgetRows.reduce((sum, budget) => sum + Number(budget.allocatedAmount), 0);
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-2xl font-bold">{t("modules.finance.title", "Finance")}</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/finance/new-budget">
              {t("modules.finance.newBudget", "New Budget")}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/finance/new-expense">
              {t("modules.finance.newExpense", "New Expense")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("finance.summary.totalAllocated", "Total Allocated")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">€{totalAllocated.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("finance.summary.totalSpent", "Total Spent")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">€{totalSpent.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("finance.summary.remaining", "Remaining")}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">€{(totalAllocated - totalSpent).toFixed(2)}</CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{t("finance.budgets.title", "Budgets")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("finance.budgets.description", "Track how much money is available and how much has been spent.")}
          </p>
        </div>
        <BudgetTable data={budgetRows} />
      </section>

      <section className="mt-8 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{t("finance.expenses.title", "Expenses")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("finance.expenses.description", "Log every purchase and assign it to a budget when relevant.")}
          </p>
        </div>
        <ExpenseTable data={expenses} />
      </section>
    </div>
  );
}

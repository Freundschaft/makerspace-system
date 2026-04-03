import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { RepairForm } from "../../new/repair-form";

interface EditRepairPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRepairPage({ params }: EditRepairPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const [repair, problemTypes] = await Promise.all([
    prisma.bicycleRepair.findUnique({
      where: { id },
    }),
    prisma.problemType.findMany({
      orderBy: {
        index: "asc",
      },
    }),
  ]);

  if (!repair) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {t("modules.repairs.editPageTitle", "Edit Bicycle Repair")}
      </h1>
      <RepairForm
        repairId={repair.id}
        problemTypes={problemTypes}
        initialData={{
          problemTypes: JSON.parse(repair.problemTypes) as string[],
          description: repair.description,
          receivedDate: repair.receivedDate.toISOString().slice(0, 10),
          ownerName: repair.ownerName,
          ownerIdCardNumber: repair.ownerIdCardNumber,
          ownerPhone: repair.ownerPhone,
          status: repair.status,
          photoPath: repair.photoPath,
        }}
      />
    </div>
  );
}

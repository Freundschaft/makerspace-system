import { getServerI18n } from "@/lib/i18n/server";
import { InKindDonationForm } from "./in-kind-donation-form";

export default async function NewInKindDonationPage() {
  const { t } = await getServerI18n();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t("inKindDonations.new.pageTitle", "New In-kind Donation")}
        </h1>
      </div>
      <InKindDonationForm mode="create" />
    </div>
  );
}

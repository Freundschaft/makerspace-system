import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

type Translator = (
  key: string,
  fallback: string,
  params?: Record<string, string | number>
) => string;

export type TeamMember = {
  id: string;
  familyName: string;
  givenNames: string;
  nationality: string | null;
  photoPath: string | null;
  status: "ACTIVE" | "INACTIVE";
  googleAccountActive: boolean;
  startDate: Date;
  endDate: Date | null;
  department: string;
  email: string;
  secondaryEmail: string | null;
  phone: string;
  homeAddress: string;
  dateOfBirth: Date;
  legalStatus: string;
};

function getPhotoSrc(value?: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return `data:image/png;base64,${trimmed}`;
}

export function getColumns(t: Translator): ColumnDef<TeamMember>[] {
  return [
    {
      accessorKey: "photoPath",
      header: t("team.table.photo", "Photo"),
      cell: ({ row }) => {
        const photoPath = row.getValue("photoPath") as string | null;
        const name = `${row.original.givenNames} ${row.original.familyName}`;

        return (
          <Avatar>
            <AvatarImage src={getPhotoSrc(photoPath)} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "familyName",
      header: t("team.form.familyName", "Family Name"),
    },
    {
      accessorKey: "givenNames",
      header: t("team.form.givenNames", "Given Names"),
    },
    {
      accessorKey: "nationality",
      header: t("team.form.nationality", "Nationality"),
    },
    {
      accessorKey: "status",
      header: t("team.table.status", "Status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
            {status === "ACTIVE"
              ? t("common.active", "Active")
              : t("common.inactive", "Inactive")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: t("team.table.startDate", "Start Date"),
      cell: ({ row }) => {
        const date = row.getValue("startDate") as Date;
        return format(new Date(date), "PPP");
      },
    },
    {
      accessorKey: "endDate",
      header: t("team.form.endDate", "End Date"),
      cell: ({ row }) => {
        const date = row.getValue("endDate") as Date | null;
        return date ? format(new Date(date), "PPP") : "—";
      },
    },
    {
      accessorKey: "department",
      header: t("team.table.department", "Department"),
    },
    {
      accessorKey: "email",
      header: t("team.table.email", "Email"),
    },
    {
      accessorKey: "phone",
      header: t("team.table.phone", "Phone"),
    },
    {
      accessorKey: "homeAddress",
      header: t("team.form.homeAddress", "Home Address"),
    },
    {
      accessorKey: "dateOfBirth",
      header: t("team.form.dateOfBirth", "Date of Birth"),
      cell: ({ row }) => {
        const date = row.getValue("dateOfBirth") as Date;
        return format(new Date(date), "PPP");
      },
    },
    {
      accessorKey: "legalStatus",
      header: t("team.form.legalStatus", "Legal Status"),
    },
  ];
}

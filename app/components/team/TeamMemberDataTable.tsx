"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/generated/prisma";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/app/components/I18nProvider";

interface TeamMemberDataTableProps {
  data: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

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

export function TeamMemberDataTable({
  data,
  onEdit,
  onDelete,
}: TeamMemberDataTableProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("team.table.photo", "Photo")}</TableHead>
            <TableHead>{t("team.table.name", "Name")}</TableHead>
            <TableHead>{t("team.table.department", "Department")}</TableHead>
            <TableHead>{t("team.table.email", "Email")}</TableHead>
            <TableHead>{t("team.table.phone", "Phone")}</TableHead>
            <TableHead>{t("team.table.status", "Status")}</TableHead>
            <TableHead>{t("team.table.googleAccount", "Google Account")}</TableHead>
            <TableHead>{t("team.table.startDate", "Start Date")}</TableHead>
            <TableHead>{t("team.table.actions", "Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={getPhotoSrc(member.photoPath)} />
                  <AvatarFallback>
                    {member.givenNames[0]}
                    {member.familyName[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                {member.givenNames} {member.familyName}
              </TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {member.status === "ACTIVE"
                    ? t("common.active", "Active")
                    : t("common.inactive", "Inactive")}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={member.googleAccountActive ? "default" : "secondary"}
                >
                  {member.googleAccountActive
                    ? t("team.googleAccount.active", "Active")
                    : t("team.googleAccount.disabled", "Disabled")}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(member.startDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(member)}
                  >
                    {t("common.edit", "Edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(member)}
                  >
                    {t("common.delete", "Delete")}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

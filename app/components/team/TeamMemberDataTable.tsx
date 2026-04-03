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
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/generated/prisma";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/app/components/I18nProvider";
import { Loader2, MoreHorizontal } from "lucide-react";
import { TeamMemberWithRole } from "@/app/team/team-types";

interface TeamMemberDataTableProps {
  data: TeamMemberWithRole[];
  currentUserEmail: string | null;
  selectedIds: string[];
  onEdit: (member: TeamMemberWithRole) => void;
  onDelete: (member: TeamMemberWithRole) => void;
  onRoleChange: (member: TeamMemberWithRole, role: UserRole) => void;
  onSelectedIdsChange: (ids: string[]) => void;
  updatingRoleId: string | null;
}

function getPhotoSrc(value?: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${trimmed}`;
  }

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
  currentUserEmail,
  selectedIds,
  onEdit,
  onDelete,
  onRoleChange,
  onSelectedIdsChange,
  updatingRoleId,
}: TeamMemberDataTableProps) {
  const { t } = useI18n();
  const selectableIds = data.map((member) => member.id);
  const allSelected =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selectedIds.includes(id));
  const someSelected = selectableIds.some((id) => selectedIds.includes(id));

  const handleRowKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    member: TeamMemberWithRole
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onEdit(member);
    }
  };

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      onSelectedIdsChange(
        Array.from(new Set([...selectedIds, ...selectableIds]))
      );
      return;
    }

    onSelectedIdsChange(
      selectedIds.filter((id) => !selectableIds.includes(id))
    );
  };

  const handleToggleOne = (memberId: string, checked: boolean) => {
    if (checked) {
      onSelectedIdsChange(Array.from(new Set([...selectedIds, memberId])));
      return;
    }

    onSelectedIdsChange(selectedIds.filter((id) => id !== memberId));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <div onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(checked) => handleToggleAll(checked === true)}
                  aria-label={t("team.bulk.selectAll", "Select all team members")}
                />
              </div>
            </TableHead>
            <TableHead>{t("team.table.photo", "Photo")}</TableHead>
            <TableHead>{t("team.table.name", "Name")}</TableHead>
            <TableHead className="hidden xl:table-cell">{t("team.table.department", "Department")}</TableHead>
            <TableHead>{t("team.table.email", "Email")}</TableHead>
            <TableHead className="hidden xl:table-cell">{t("team.table.phone", "Phone")}</TableHead>
            <TableHead>{t("team.table.status", "Status")}</TableHead>
            <TableHead>{t("team.table.role", "Role")}</TableHead>
            <TableHead className="hidden lg:table-cell">{t("team.table.googleAccount", "Google Account")}</TableHead>
            <TableHead className="hidden lg:table-cell">{t("team.table.startDate", "Start Date")}</TableHead>
            <TableHead>{t("team.table.actions", "Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow
              key={member.id}
              className="cursor-pointer transition-colors hover:bg-muted/40"
              onClick={() => onEdit(member)}
              onKeyDown={(event) => handleRowKeyDown(event, member)}
              tabIndex={0}
            >
              <TableCell onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(member.id)}
                  onCheckedChange={(checked) =>
                    handleToggleOne(member.id, checked === true)
                  }
                  aria-label={t("team.bulk.selectOne", "Select team member")}
                />
              </TableCell>
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
              <TableCell className="hidden xl:table-cell">{member.department}</TableCell>
              <TableCell className="max-w-[10rem] truncate lg:max-w-[12rem] xl:max-w-none">{member.email}</TableCell>
              <TableCell className="hidden xl:table-cell">{member.phone}</TableCell>
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
                <Badge variant={member.userRole === "ADMIN" ? "default" : "secondary"}>
                  {member.userRole === "ADMIN"
                    ? t("team.roles.admin", "Admin")
                    : member.userRole === "TEAM_MEMBER"
                      ? t("team.roles.member", "Team Member")
                      : t("team.roles.noAccount", "No account yet")}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant={member.googleAccountActive ? "default" : "secondary"}
                >
                  {member.googleAccountActive
                    ? t("team.googleAccount.active", "Active")
                    : t("team.googleAccount.disabled", "Disabled")}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {format(new Date(member.startDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div
                  className="hidden min-w-[10rem] items-center gap-2 xl:flex"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Button
                    variant={member.userRole === "ADMIN" ? "outline" : "secondary"}
                    size="sm"
                    className="h-8 w-28 shrink-0 justify-center px-2 text-xs"
                    disabled={
                      member.email === currentUserEmail ||
                      updatingRoleId === member.id
                    }
                    onClick={() =>
                      onRoleChange(
                        member,
                        member.userRole === "ADMIN"
                          ? UserRole.TEAM_MEMBER
                          : UserRole.ADMIN
                      )
                    }
                  >
                    {updatingRoleId === member.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : member.userRole === "ADMIN" ? (
                      t("team.actions.makeMember", "Make Member")
                    ) : (
                      t("team.actions.makeAdmin", "Make Admin")
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 flex-1 justify-center px-2 text-xs"
                    onClick={() => onDelete(member)}
                  >
                    {t("common.delete", "Delete")}
                  </Button>
                </div>
                <div
                  className="flex justify-end xl:hidden"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label={t("common.actions", "Actions")}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onRoleChange(
                            member,
                            member.userRole === "ADMIN"
                              ? UserRole.TEAM_MEMBER
                              : UserRole.ADMIN
                          )
                        }
                        disabled={
                          member.email === currentUserEmail ||
                          updatingRoleId === member.id
                        }
                      >
                        {updatingRoleId === member.id
                          ? t("team.actions.updatingRole", "Updating role...")
                          : member.userRole === "ADMIN"
                            ? t("team.actions.makeMember", "Make Member")
                            : t("team.actions.makeAdmin", "Make Admin")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(member)}>
                        {t("common.edit", "Edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(member)}
                      >
                        {t("common.delete", "Delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

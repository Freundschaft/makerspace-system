"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Loader2, MoreHorizontal } from "lucide-react";

import { useI18n } from "@/app/components/I18nProvider";
import { TeamMemberWithRole } from "@/app/team/team-types";
import { UserRole } from "@/generated/prisma";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTeamMemberPhotoSrc } from "@/lib/team-photo";

interface TeamMemberCardGridProps {
  data: TeamMemberWithRole[];
  currentUserEmail: string | null;
  selectedIds: string[];
  onEdit: (member: TeamMemberWithRole) => void;
  onDelete: (member: TeamMemberWithRole) => void;
  onRoleChange: (member: TeamMemberWithRole, role: UserRole) => void;
  onSelectedIdsChange: (ids: string[]) => void;
  updatingRoleId: string | null;
}

function getInitials(member: TeamMemberWithRole) {
  return `${member.givenNames[0] ?? ""}${member.familyName[0] ?? ""}`.toUpperCase();
}

export function TeamMemberCardGrid({
  data,
  currentUserEmail,
  selectedIds,
  onEdit,
  onDelete,
  onRoleChange,
  onSelectedIdsChange,
  updatingRoleId,
}: TeamMemberCardGridProps) {
  const { t } = useI18n();

  const handleToggleOne = (memberId: string, checked: boolean) => {
    if (checked) {
      onSelectedIdsChange(Array.from(new Set([...selectedIds, memberId])));
      return;
    }

    onSelectedIdsChange(selectedIds.filter((id) => id !== memberId));
  };

  const renderRoleAction = (member: TeamMemberWithRole) => {
    const nextRole =
      member.userRole === "ADMIN" ? UserRole.TEAM_MEMBER : UserRole.ADMIN;

    return (
      <Button
        variant={member.userRole === "ADMIN" ? "outline" : "secondary"}
        size="sm"
        className="h-8 justify-center px-2 text-xs"
        disabled={member.email === currentUserEmail || updatingRoleId === member.id}
        onClick={(event) => {
          event.stopPropagation();
          onRoleChange(member, nextRole);
        }}
      >
        {updatingRoleId === member.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : member.userRole === "ADMIN" ? (
          t("team.actions.makeMember", "Make Member")
        ) : (
          t("team.actions.makeAdmin", "Make Admin")
        )}
      </Button>
    );
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data.map((member) => {
        const photoSrc = getTeamMemberPhotoSrc(member.photoPath);
        const selected = selectedIds.includes(member.id);

        return (
          <article
            key={member.id}
            tabIndex={0}
            onClick={() => onEdit(member)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onEdit(member);
              }
            }}
            className="group cursor-pointer overflow-hidden rounded-lg border bg-card shadow-sm outline-none transition hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative aspect-[4/3] bg-muted">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={`${member.givenNames} ${member.familyName}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted text-4xl font-semibold text-muted-foreground">
                  {getInitials(member)}
                </div>
              )}
              <div className="absolute left-3 top-3" onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={selected}
                  onCheckedChange={(checked) =>
                    handleToggleOne(member.id, checked === true)
                  }
                  aria-label={t("team.bulk.selectOne", "Select team member")}
                  className="border-background bg-background/90 shadow-sm"
                />
              </div>
              <div className="absolute right-3 top-3 flex gap-2">
                <Badge variant={member.status === "ACTIVE" ? "default" : "secondary"}>
                  {member.status === "ACTIVE"
                    ? t("common.active", "Active")
                    : t("common.inactive", "Inactive")}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold leading-6">
                    {member.givenNames} {member.familyName}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {member.department}
                  </p>
                </div>
                <div onClick={(event) => event.stopPropagation()}>
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
              </div>

              <div className="grid gap-1 text-sm">
                <a
                  href={`mailto:${member.email}`}
                  className="truncate text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {member.email}
                </a>
                <div onClick={(event) => event.stopPropagation()}>
                  <WhatsAppLink value={member.phone} fallback={member.phone} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={member.userRole === "ADMIN" ? "default" : "secondary"}>
                  {member.userRole === "ADMIN"
                    ? t("team.roles.admin", "Admin")
                    : member.userRole === "TEAM_MEMBER"
                      ? t("team.roles.member", "Team Member")
                      : t("team.roles.noAccount", "No account yet")}
                </Badge>
                <Badge variant={member.googleAccountActive ? "outline" : "secondary"}>
                  {member.googleAccountActive
                    ? t("team.googleAccount.active", "Google Active")
                    : t("team.googleAccount.disabled", "Google Disabled")}
                </Badge>
              </div>

              <div className="flex items-center justify-between gap-2 border-t pt-3">
                <span className="text-xs text-muted-foreground">
                  {t("team.table.startDate", "Start Date")}:{" "}
                  {format(new Date(member.startDate), "MMM d, yyyy")}
                </span>
                <div className="hidden sm:block">{renderRoleAction(member)}</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

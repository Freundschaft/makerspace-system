'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { TeamMember } from "./columns";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function TeamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchTeamMembers();
    }
  }, [status]);
  
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleEdit = (member: TeamMember) => {
    router.push(`/team/${member.id}/edit`);
  };

  const handleDelete = async (member: TeamMember) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await fetch(`/api/team/${member.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete team member');
        }
        setTeamMembers(teamMembers.filter(m => m.id !== member.id));
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/team/sync', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to sync with Google Workspace');
      }
      alert('Successfully synced with Google Workspace');
    } catch (error) {
      console.error('Error syncing with Google Workspace:', error);
      alert('Failed to sync with Google Workspace');
    } finally {
      setSyncing(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              'Sync with Google Workspace'
            )}
          </Button>
          <Button
            onClick={() => router.push('/team/new')}
          >
            Add Team Member
          </Button>
        </div>
      </div>
      <TeamMemberDataTable 
        data={teamMembers} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
} 
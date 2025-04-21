'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { TeamMember } from "./columns";

export default function TeamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <button 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          onClick={() => router.push('/team/new')}
        >
          Add Team Member
        </button>
      </div>
      <TeamMemberDataTable 
        data={teamMembers} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
} 
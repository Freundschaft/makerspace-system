import { TeamMemberForm } from "../team-member-form";

export default function NewTeamMemberPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Team Member</h1>
        <TeamMemberForm mode="create" />
      </div>
    </div>
  );
} 

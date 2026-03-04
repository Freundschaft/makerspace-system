import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
          <p className="mb-4">This is a protected dashboard page. Only authenticated users can see this content.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <p><span className="font-medium">Email:</span> {session?.user?.email}</p>
              <p><span className="font-medium">Name:</span> {session?.user?.name}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Account Status</h3>
              <p className="text-secondary-foreground font-medium">Active</p>
              <p className="text-sm text-muted-foreground">Last login: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button className="p-4 bg-accent/15 rounded-md hover:bg-accent/25 transition-colors">
              View Profile
            </button>
            <button className="p-4 bg-secondary/30 rounded-md hover:bg-secondary/45 transition-colors">
              Manage Settings
            </button>
            <button className="p-4 bg-primary/20 rounded-md hover:bg-primary/30 transition-colors">
              View Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 

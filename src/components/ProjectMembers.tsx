"use client";

import { User, Shield, Code, UserCheck, User2 } from "lucide-react";

type Member = {
  id: number;
  name: string;
  role: string;
};

export default function ProjectMembers({ members }: { members: Member[] }) {
  // Function to get appropriate icon based on role
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'owner':
        return <Shield className="h-4 w-4 text-primary" />;
      case 'developer':
      case 'dev':
        return <Code className="h-4 w-4 text-blue-400" />;
      case 'reporter':
      case 'tester':
        return <UserCheck className="h-4 w-4 text-green-400" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Function to get role badge color
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'owner':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'developer':
      case 'dev':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'reporter':
      case 'tester':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="github-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Project Members</h2>
        <span className="text-sm text-muted-foreground">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <User2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-medium mb-2">No members yet</h3>
          <p className="text-sm text-muted-foreground">Add members to collaborate on this project</p>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  {getRoleIcon(member.role)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{member.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                ID: #{member.id}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Optional: Add member button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="github-btn-outline w-full flex items-center justify-center gap-2">
          <User className="h-4 w-4" />
          Add Member
        </button>
      </div>
    </div>
  );
}
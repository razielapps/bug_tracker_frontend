// /components/ProjectMembers.tsx
type Member = {
  id: number;
  name: string;
  role: string;
};

export default function ProjectMembers({ members }: { members: Member[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Project Members</h2>
      <ul className="space-y-1">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between px-3 py-2 rounded bg-muted/50"
          >
            <span className="font-medium">{member.name}</span>
            <span className="text-xs text-muted-foreground">{member.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BugDetail({ bug }: { bug: any }) {
    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{bug.title}</h2>
                    <Badge variant="outline">{bug.status}</Badge>
                </div>

                <p className="text-gray-700">{bug.description}</p>

                <div className="text-sm space-y-1">
                    <p><strong>Priority:</strong> {bug.priority}</p>
                    <p><strong>Assigned to:</strong> {bug.assigned_to}</p>
                    <p><strong>Project:</strong> {bug.project?.name}</p>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Comments</h3>
                    <div className="space-y-2">
                        {bug.comments?.length > 0 ? (
                            bug.comments.map((comment: any, i: number) => (
                                <div key={i} className="border p-2 rounded-md text-sm">
                                    <p>{comment.text}</p>
                                    <span className="text-xs text-gray-500">
                                        – {comment.user} on {new Date(comment.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No comments yet.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

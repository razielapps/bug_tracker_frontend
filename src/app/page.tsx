// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // GitHub-style apps never show a blank root page
  // Redirect immediately to dashboard
  redirect("/dashboard");
}

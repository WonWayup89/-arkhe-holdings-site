import { redirect } from "next/navigation";

export default function AssistantRedirectPage() {
  redirect(process.env.NEXT_PUBLIC_ARKHE_ASSISTANT_URL || "https://assistant.arkheholdings.net/login");
}

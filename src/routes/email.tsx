import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Email Generator — WorkflowAI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("professional");
  const [intent, setIntent] = useState("");

  return (
    <ToolWorkspace
      icon={<Mail className="h-6 w-6" />}
      title="Smart Email Generator"
      description="Generate polished, on-tone emails for any workplace situation."
      outputLabel="Email Draft"
      inputs={
        <>
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" placeholder="e.g. Hiring manager, Client, Team" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="subject">Subject / Context</Label>
            <Input id="subject" placeholder="e.g. Follow-up after interview" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="concise">Concise & direct</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="intent">What do you want to say?</Label>
            <Textarea
              id="intent"
              placeholder="Describe the key points, requests, or message you want to convey…"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </>
      }
      buildPrompt={() => {
        if (!intent.trim()) return null;
        return {
          system: "You are an expert business communication assistant. Write clear, well-structured emails with a subject line, greeting, body, and sign-off. Match the requested tone exactly.",
          prompt: `Write an email with these details:
- Recipient: ${recipient || "(unspecified)"}
- Subject/Context: ${subject || "(unspecified)"}
- Tone: ${tone}
- Key message: ${intent}

Format as:
**Subject:** ...

(Greeting)

(Body)

(Sign-off)`,
        };
      }}
    />
  );
}

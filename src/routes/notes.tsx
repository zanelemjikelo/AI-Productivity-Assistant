import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — WorkflowAI" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <ToolWorkspace
      icon={<FileText className="h-6 w-6" />}
      title="Meeting Notes Summarizer"
      description="Paste raw meeting notes and get a structured summary with decisions and action items."
      outputLabel="Summary"
      inputs={
        <>
          <div>
            <Label htmlFor="title">Meeting Title (optional)</Label>
            <Input id="title" placeholder="e.g. Q3 Product Planning" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="notes">Raw Notes / Transcript</Label>
            <Textarea
              id="notes"
              placeholder="Paste your meeting notes, transcript, or bullet points here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[280px]"
            />
          </div>
        </>
      }
      buildPrompt={() => {
        if (!notes.trim()) return null;
        return {
          system: "You are an expert meeting analyst. Summarize meeting notes into a clear, scannable structured document.",
          prompt: `Summarize these meeting notes${title ? ` for "${title}"` : ""}.

Use this exact markdown structure:

## Overview
(2-3 sentence summary)

## Key Discussion Points
- ...

## Decisions Made
- ...

## Action Items
- [ ] **Owner** — Task — Due date (if mentioned)

## Open Questions / Follow-ups
- ...

Raw notes:
${notes}`,
        };
      }}
    />
  );
}

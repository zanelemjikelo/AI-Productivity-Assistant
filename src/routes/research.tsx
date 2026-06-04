import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — WorkflowAI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState("brief");

  return (
    <ToolWorkspace
      icon={<Search className="h-6 w-6" />}
      title="AI Research Assistant"
      description="Get a structured research brief on any topic, tailored to your audience."
      outputLabel="Research Brief"
      inputs={
        <>
          <div>
            <Label htmlFor="topic">Research Topic / Question</Label>
            <Input id="topic" placeholder="e.g. Trends in remote work productivity tools" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="audience">Audience (optional)</Label>
            <Input id="audience" placeholder="e.g. Executive team, technical reviewers" value={audience} onChange={(e) => setAudience(e.target.value)} />
          </div>
          <div>
            <Label>Depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief (1-page overview)</SelectItem>
                <SelectItem value="standard">Standard (detailed)</SelectItem>
                <SelectItem value="deep">Deep dive (comprehensive)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      }
      buildPrompt={() => {
        if (!topic.trim()) return null;
        return {
          system: "You are a senior research analyst. Produce well-structured, neutral, and clearly organized research briefs. Be explicit when something is uncertain or rapidly changing.",
          prompt: `Produce a ${depth} research brief.

**Topic:** ${topic}
**Audience:** ${audience || "General business"}

Structure:

## Executive Summary
(3-4 sentences)

## Key Findings
- ...

## Background & Context
...

## Important Considerations / Trade-offs
- ...

## Open Questions
- ...

## Suggested Next Steps
- ...

Note any areas where current real-time data would meaningfully change conclusions.`,
        };
      }}
    />
  );
}

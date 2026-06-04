import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "AI Task Planner — WorkflowAI" }] }),
  component: PlannerPage,
});

function PlannerPage() {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("1 week");
  const [context, setContext] = useState("");

  return (
    <ToolWorkspace
      icon={<ListChecks className="h-6 w-6" />}
      title="AI Task Planner"
      description="Turn a goal into a prioritized, time-boxed action plan."
      outputLabel="Action Plan"
      inputs={
        <>
          <div>
            <Label htmlFor="goal">Goal / Project</Label>
            <Input id="goal" placeholder="e.g. Launch new landing page" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </div>
          <div>
            <Label>Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1 day">1 day</SelectItem>
                <SelectItem value="3 days">3 days</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="1 quarter">1 quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="context">Context / Constraints (optional)</Label>
            <Textarea
              id="context"
              placeholder="Team size, resources available, dependencies, blockers…"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </>
      }
      buildPrompt={() => {
        if (!goal.trim()) return null;
        return {
          system: "You are a senior project manager. Create realistic, prioritized, time-boxed plans with clear next steps.",
          prompt: `Create an action plan for this goal.

**Goal:** ${goal}
**Timeframe:** ${timeframe}
**Context:** ${context || "None provided"}

Use this markdown structure:

## Objective
(One sentence)

## Milestones
(2-4 milestones with target dates relative to today)

## Prioritized Tasks
| Priority | Task | Est. Time | Owner |
|---|---|---|---|
| P0 | ... | ... | ... |

## Risks & Mitigations
- ...

## Quick Wins (Do First)
- ...`,
        };
      }}
    />
  );
}

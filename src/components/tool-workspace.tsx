import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface ToolWorkspaceProps {
  icon: ReactNode;
  title: string;
  description: string;
  inputs: ReactNode;
  buildPrompt: () => { system: string; prompt: string } | null;
  outputLabel?: string;
  outputPlaceholder?: string;
}

export function ToolWorkspace({
  icon,
  title,
  description,
  inputs,
  buildPrompt,
  outputLabel = "AI Output",
  outputPlaceholder = "Your generated content will appear here…",
}: ToolWorkspaceProps) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);

  async function handleGenerate() {
    const built = buildPrompt();
    if (!built) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    setOutput("");
    setEditMode(false);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(built),
      });
      if (!res.ok) {
        const msg = await res.text();
        if (res.status === 429) toast.error("Rate limit reached. Please wait a moment.");
        else if (res.status === 402) toast.error("AI credits exhausted. Please add credits in workspace settings.");
        else toast.error(msg || "Generation failed");
        return;
      }
      const data = (await res.json()) as { text: string };
      setOutput(data.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-md"
          style={{ background: "var(--gradient-primary)" }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Inputs</h2>
          </div>
          <div className="space-y-4">{inputs}</div>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full"
            size="lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate
              </>
            )}
          </Button>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">{outputLabel}</h2>
            {output && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditMode((e) => !e)}>
                  {editMode ? "Preview" : "Edit"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
          {!output && !loading && (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              {outputPlaceholder}
            </div>
          )}
          {loading && (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          {output && editMode && (
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
          )}
          {output && !editMode && (
            <div className="prose prose-sm max-w-none rounded-lg border bg-muted/30 p-4 dark:prose-invert">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )}
        </Card>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        AI-generated content may contain errors. Always review for accuracy before use.
      </p>
    </div>
  );
}

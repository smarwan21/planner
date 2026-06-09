import { useApp } from "../../hooks/useApp";
import { problems } from "../../data/registry";
import { Button } from "../ui/Button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MIN_SUMMARY_LENGTH = 10;

export default function Stage2ProblemStatement() {
  const { state, dispatch } = useApp();
  const session = state.session!;
  const allProblems = [
    ...problems,
    ...state.customProblems.map((cp) => ({
      id: cp.id,
      title: cp.title,
      difficulty: "medium" as const,
      category: "Custom",
      description: cp.description,
      markdown: cp.markdown,
    })),
  ];
  const problem = allProblems.find((p) => p.id === session.problemId);
  if (!problem) return null;

  const data = session.stageData[2];

  const difficultyColor = {
    easy: "text-success border-success/30 bg-success/10",
    medium: "text-secondary border-secondary/30 bg-secondary/10",
    hard: "text-accent border-accent/30 bg-accent/10",
  }[problem.difficulty];

  return (
    <div>
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-block text-xs font-mono px-2 py-0.5 rounded ${difficultyColor}`}
          >
            {problem.difficulty}
          </span>
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
            {problem.category}
          </span>
        </div>

        <h3 className="font-display font-semibold text-2xl text-text-primary mb-6">
          {problem.title}
        </h3>

        <div className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>{problem.markdown}</Markdown>
        </div>
      </div>

      <div className="card p-8 mt-6">
        <label className="block font-display font-semibold text-lg text-text-primary mb-2">
          Summarize the Problem
        </label>
        <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
          In the box below, summarize the core problem you are solving in your
          own words.
        </p>
        <p className="font-body text-text-muted text-sm mb-4 italic">
          Tip: Imagine you are explaining this task to a junior developer. What
          is the ultimate goal of this program, and what are the absolute
          constraints?
        </p>
        <textarea
          value={data.summary}
          onChange={(e) =>
            dispatch({
              type: "SET_STAGE_DATA",
              stage: 2,
              data: { summary: e.target.value },
            })
          }
          placeholder="Write your summary here..."
          rows={5}
          className="w-full resize-y"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-body text-text-muted">
            {data.summary.length} character
            {data.summary.length !== 1 ? "s" : ""}
            {data.summary.length < MIN_SUMMARY_LENGTH && data.summary.length > 0
              ? ` (${MIN_SUMMARY_LENGTH - data.summary.length} more needed)`
              : ""}
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-black/5 mt-6">
        <Button
          variant="ghost"
          onClick={() => dispatch({ type: "GO_TO_STAGE", stage: 1 })}
        >
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch({ type: "COMPLETE_STAGE", stage: 2 })}
          disabled={data.summary.trim().length < MIN_SUMMARY_LENGTH}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}

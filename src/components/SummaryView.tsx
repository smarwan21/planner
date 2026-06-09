import { useApp } from '../hooks/useApp';
import { problems } from '../data/registry';
import { Button } from './ui/Button';
import { exportToMarkdown } from '../utils/exportToMarkdown';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CONCEPT_LABELS: Record<string, string> = {
  variables: 'Variables and assignment',
  conditionals: 'Conditionals (if/else)',
  loops: 'Loops (while/for)',
  functions: 'Functions',
  strings: 'Strings and string methods',
  lists: 'Lists, tuples, dictionaries',
  'file-io': 'File input/output',
  recursion: 'Recursion',
  'error-handling': 'Error handling (try/except)',
  math: 'Mathematical operations',
};

export function SummaryView() {
  const { state, dispatch } = useApp();
  const session = state.session!;
  if (!state.session) return null;

  const allProblems = [
    ...problems,
    ...state.customProblems.map((cp) => ({
      ...cp,
      difficulty: 'medium' as const,
      category: 'Custom',
    })),
  ];
  const found = allProblems.find((p) => p.id === session.problemId);
  if (!found) return null;

  const d = session.stageData;

  function handleExport() {
    if (!found) return;
    const md = exportToMarkdown(session, found);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${found.id}-plan.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-10 fade-in stagger-1">
        <span className="inline-block text-xs font-mono text-success border border-success/30 bg-success/10 px-2 py-0.5 rounded mb-3">
          Planning Complete
        </span>
        <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
          {found.title}
        </h1>
        <p className="text-text-secondary text-sm font-body">
          Started {new Date(session.startedAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-6 fade-in stagger-2">
        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-4">Problem Statement</h2>
          <div className="markdown-content">
            <Markdown remarkPlugins={[remarkGfm]}>{found.markdown}</Markdown>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-4">Prior Concepts</h2>
          {d[3].concepts.length > 0 ? (
            <div className="space-y-2">
              {d[3].concepts.map((c) => (
                <div key={c.id} className="flex items-center gap-2 font-body text-sm text-text-secondary">
                  <span className="text-text-muted">•</span>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm italic">No concepts recorded.</p>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-4">Subtasks</h2>
          {d[4].subtasks.length > 0 ? (
            <div className="space-y-4">
              {d[4].subtasks.map((subtask, idx) => (
                <div key={subtask.id} className="bg-bg-elevated rounded-lg p-4">
                  <h3 className="font-display font-semibold text-sm text-text-primary mb-3">
                    Subtask {idx + 1}: {subtask.description || <span className="italic text-text-muted font-normal">No description</span>}
                  </h3>

                  {subtask.variables.length > 0 && (
                    <div className="mb-3">
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Variables</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {subtask.variables.map((v) => (
                          <span key={v.id} className="inline-flex items-center gap-1.5 text-xs font-mono bg-bg-card border border-black/5 rounded px-2 py-1 text-text-primary">
                            <span className="text-accent">{v.type}</span>
                            <span>{v.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {subtask.conceptKeys.length > 0 && (
                    <div>
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Concepts</span>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {subtask.conceptKeys.map((key) => (
                          <span key={key} className="text-xs font-body bg-accent/5 text-accent rounded px-2 py-0.5">
                            {CONCEPT_LABELS[key] || key}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {subtask.variables.length === 0 && subtask.conceptKeys.length === 0 && (
                    <p className="text-text-muted text-xs italic">No details defined.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm italic">No subtasks defined.</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-10 fade-in stagger-4">
        <Button variant="primary" onClick={handleExport}>
          Export as Markdown
        </Button>
        <Button variant="secondary" onClick={() => dispatch({ type: 'RESET' })}>
          Solve Another Problem
        </Button>
      </div>
    </div>
  );
}

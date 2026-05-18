import { useApp } from '../hooks/useApp';
import { problems } from '../data/registry';
import { Button } from './ui/Button';
import { StepNumber, Session } from '../types/session';
import { exportToMarkdown } from '../utils/exportToMarkdown';

const stepLabels: Record<StepNumber, string> = {
  1: 'Understand the Problem',
  2: 'Define the Inputs',
  3: 'Define the Outputs',
  4: 'Types of Input / Output',
  5: 'Decompose the Problem',
  6: 'Edge Cases',
  7: 'Implementation',
  8: 'Verification (Tests)',
  9: 'Optimality',
};

export function SummaryView() {
  const { state, dispatch } = useApp();
  const session = state.session!;
  if (!state.session) return null;

  const allProblems = [...problems, ...state.customProblems];
  const found = allProblems.find((p) => p.id === session.problemId);
  if (!found) return null;

  const d = session.stepData;

  function handleExport() {
    if (!found) return;
    const md = exportToMarkdown(session, found.title, found.description);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${found.id}-solution.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-10 fade-in stagger-1">
        <span className="inline-block text-xs font-mono text-success border border-success/30 bg-success/10 px-2 py-0.5 rounded mb-3">
          Completed
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
          <h2 className="font-display font-semibold text-lg text-accent mb-2">Problem Statement</h2>
          <p className="font-body text-text-secondary text-sm whitespace-pre-wrap">{found.description}</p>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-3">1. {stepLabels[1]}</h2>
          <p className="font-body text-text-secondary text-sm whitespace-pre-wrap">{d[1].understanding}</p>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-3">2. {stepLabels[2]}</h2>
          {d[2].inputs.length > 0 ? (
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs uppercase">
                  <th className="text-left pb-2 pr-4">Name</th>
                  <th className="text-left pb-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {d[2].inputs.map((inp) => (
                  <tr key={inp.id} className="border-t border-white/5">
                    <td className="py-2 pr-4 font-mono text-text-primary">{inp.name}</td>
                    <td className="py-2 text-text-secondary">{inp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-text-muted text-sm italic">No inputs defined.</p>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-3">3. {stepLabels[3]}</h2>
          {d[3].outputs.length > 0 ? (
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs uppercase">
                  <th className="text-left pb-2 pr-4">Name</th>
                  <th className="text-left pb-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {d[3].outputs.map((out) => (
                  <tr key={out.id} className="border-t border-white/5">
                    <td className="py-2 pr-4 font-mono text-text-primary">{out.name}</td>
                    <td className="py-2 text-text-secondary">{out.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-text-muted text-sm italic">No outputs defined.</p>
          )}
        </div>

    <div className="card p-6">
      <h2 className="font-display font-semibold text-lg text-accent mb-3">4. {stepLabels[4]}</h2>
      {d[4].types.length > 0 ? (
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-text-muted text-xs uppercase">
              <th className="text-left pb-2 pr-4">Field</th>
              <th className="text-left pb-2">Type</th>
            </tr>
          </thead>
          <tbody>
          {d[4].types.map((t) => (
              <tr key={t.fieldId} className="border-t border-white/5">
                <td className="py-2 pr-4 text-text-primary">{t.fieldName}</td>
                <td className="py-2 font-mono text-accent">{t.type}</td>
              </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p className="text-text-muted text-sm italic">No types defined.</p>
      )}
    </div>

    <div className="card p-6">
      <h2 className="font-display font-semibold text-lg text-accent mb-3">5. {stepLabels[5]}</h2>
      <ol className="list-decimal list-inside space-y-1 font-body text-sm text-text-secondary">
      {d[5].decompositionSteps.map((step, idx) => (
          <li key={idx}>{step}</li>
      ))}
      </ol>
    </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-3">6. {stepLabels[6]}</h2>
          {d[6].edgeCases.length > 0 ? (
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-text-muted text-xs uppercase">
                  <th className="text-left pb-2 pr-4">Edge Case</th>
                  <th className="text-left pb-2">Expected Behavior</th>
                </tr>
              </thead>
              <tbody>
                {d[6].edgeCases.map((ec) => (
                  <tr key={ec.id} className="border-t border-white/5">
                    <td className="py-2 pr-4 text-text-primary">{ec.description}</td>
                    <td className="py-2 text-text-secondary">{ec.expectedBehavior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-text-muted text-sm italic">No edge cases defined.</p>
          )}
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-white/5 px-4 py-2 bg-bg-elevated flex items-center">
            <span className="text-xs font-mono text-text-muted">7. {stepLabels[7]}</span>
          </div>
          <pre className="p-4 text-sm font-mono text-text-secondary overflow-x-auto whitespace-pre-wrap">
            {d[7].code || <span className="italic text-text-muted">No code written.</span>}
          </pre>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-white/5 px-4 py-2 bg-bg-elevated flex items-center">
            <span className="text-xs font-mono text-text-muted">8. {stepLabels[8]}</span>
          </div>
          <pre className="p-4 text-sm font-mono text-text-secondary overflow-x-auto whitespace-pre-wrap">
            {d[8].tests || <span className="italic text-text-muted">No tests written.</span>}
          </pre>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-lg text-accent mb-3">9. {stepLabels[9]}</h2>
          <div className="space-y-2 text-sm font-body">
            <div>
              <span className="text-text-muted">Time Complexity:</span>{' '}
              <span className="text-text-primary font-mono">{d[9].timeComplexity || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-text-muted">Space Complexity:</span>{' '}
              <span className="text-text-primary font-mono">{d[9].spaceComplexity || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-text-muted">Alternative Approaches:</span>{' '}
              <span className="text-text-primary">{d[9].alternatives || 'Not specified'}</span>
            </div>
          </div>
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

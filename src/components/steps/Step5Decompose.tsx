import { useApp } from '../../hooks/useApp';

export default function Step5Decompose() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[5];

  function addStep() {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 5,
      data: { decompositionSteps: [...data.decompositionSteps, ''] },
    });
  }

  function removeStep(idx: number) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 5,
      data: { decompositionSteps: data.decompositionSteps.filter((_, i) => i !== idx) },
    });
  }

  function updateStep(idx: number, value: string) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 5,
      data: {
        decompositionSteps: data.decompositionSteps.map((s, i) => (i === idx ? value : s)),
      },
    });
  }

  function moveStep(idx: number, direction: -1 | 1) {
    const newSteps = [...data.decompositionSteps];
    const target = idx + direction;
    if (target < 0 || target >= newSteps.length) return;
    [newSteps[idx], newSteps[target]] = [newSteps[target], newSteps[idx]];
    dispatch({ type: 'SET_STEP_DATA', step: 5, data: { decompositionSteps: newSteps } });
  }

  return (
    <div className="card p-6">
      <div className="space-y-2">
        {data.decompositionSteps.map((step, idx) => (
          <div key={idx} className="flex gap-2 items-start fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
            <span className="font-mono text-text-muted text-sm pt-2.5 shrink-0 w-8 text-right">
              {idx + 1}.
            </span>
            <input
              type="text"
              placeholder="e.g. Parse the input string into characters"
              value={step}
              onChange={(e) => updateStep(idx, e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-1 pt-2">
              <button
                onClick={() => moveStep(idx, -1)}
                disabled={idx === 0}
                className="text-text-muted hover:text-text-secondary disabled:opacity-20 text-sm"
              >
                ↑
              </button>
              <button
                onClick={() => moveStep(idx, 1)}
                disabled={idx === data.decompositionSteps.length - 1}
                className="text-text-muted hover:text-text-secondary disabled:opacity-20 text-sm"
              >
                ↓
              </button>
              <button
                onClick={() => removeStep(idx)}
                className="text-text-muted hover:text-accent transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addStep}
        className="mt-4 text-sm font-body text-accent hover:text-accent-hover transition-colors"
      >
        + Add Step
      </button>

      {data.decompositionSteps.length < 2 && (
        <p className="text-text-muted text-sm font-body mt-2">
          Add at least 2 steps to break down the problem.
        </p>
      )}
    </div>
  );
}

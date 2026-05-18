import { useApp } from '../../hooks/useApp';

export default function Step6EdgeCases() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[6];

  function addCase() {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 6,
      data: {
        edgeCases: [
          ...data.edgeCases,
          { id: crypto.randomUUID(), description: '', expectedBehavior: '' },
        ],
      },
    });
  }

  function removeCase(id: string) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 6,
      data: { edgeCases: data.edgeCases.filter((c) => c.id !== id) },
    });
  }

  function updateCase(id: string, field: 'description' | 'expectedBehavior', value: string) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 6,
      data: {
        edgeCases: data.edgeCases.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
      },
    });
  }

  return (
    <div className="card p-6">
      <div className="space-y-4">
        {data.edgeCases.map((ec, idx) => (
          <div key={ec.id} className="fade-in border border-white/5 rounded-lg p-4 bg-bg-elevated" style={{ animationDelay: `${idx * 80}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-xs text-text-muted">Edge case #{idx + 1}</span>
              <button
                onClick={() => removeCase(ec.id)}
                className="text-text-muted hover:text-accent transition-colors text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="What is the edge case? (e.g. empty string, negative number)"
                value={ec.description}
                onChange={(e) => updateCase(ec.id, 'description', e.target.value)}
                className="w-full"
              />
              <input
                type="text"
                placeholder="How should the program behave? (e.g. return False, raise ValueError)"
                value={ec.expectedBehavior}
                onChange={(e) => updateCase(ec.id, 'expectedBehavior', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addCase}
        className="mt-4 text-sm font-body text-accent hover:text-accent-hover transition-colors"
      >
        + Add Edge Case
      </button>

      {data.edgeCases.length === 0 && (
        <p className="text-text-muted text-sm font-body mt-2">
          Add at least one edge case to continue. Think about empty inputs, extreme values, type mismatches, etc.
        </p>
      )}
    </div>
  );
}

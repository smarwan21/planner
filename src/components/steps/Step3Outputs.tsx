import { useApp } from '../../hooks/useApp';

export default function Step3Outputs() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[3];

  function addOutput() {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 3,
      data: { outputs: [...data.outputs, { id: crypto.randomUUID(), name: '', description: '' }] },
    });
  }

  function removeOutput(id: string) {
    dispatch({ type: 'SET_STEP_DATA', step: 3, data: { outputs: data.outputs.filter((o) => o.id !== id) } });
  }

  function updateOutput(id: string, field: 'name' | 'description', value: string) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 3,
      data: {
        outputs: data.outputs.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
      },
    });
  }

  return (
    <div className="card p-6">
      <div className="space-y-3">
        {data.outputs.map((output, idx) => (
          <div key={output.id} className="flex gap-3 items-start fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
            <span className="font-mono text-text-muted text-sm pt-2.5 shrink-0 w-6">#{idx + 1}</span>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                placeholder="Output name (e.g. result, is_palindrome)"
                value={output.name}
                onChange={(e) => updateOutput(output.id, 'name', e.target.value)}
                className="w-full"
              />
              <input
                type="text"
                placeholder="Description (e.g. whether the string is a palindrome)"
                value={output.description}
                onChange={(e) => updateOutput(output.id, 'description', e.target.value)}
                className="w-full"
              />
            </div>
            <button
              onClick={() => removeOutput(output.id)}
              className="text-text-muted hover:text-accent transition-colors pt-2.5 text-sm font-body"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addOutput}
        className="mt-4 text-sm font-body text-accent hover:text-accent-hover transition-colors"
      >
        + Add Output
      </button>

      {data.outputs.length === 0 && (
        <p className="text-text-muted text-sm font-body mt-2">Add at least one output to continue.</p>
      )}
    </div>
  );
}

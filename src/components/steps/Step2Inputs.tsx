import { useApp } from '../../hooks/useApp';

export default function Step2Inputs() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[2];

  function addInput() {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 2,
      data: { inputs: [...data.inputs, { id: crypto.randomUUID(), name: '', description: '' }] },
    });
  }

  function removeInput(id: string) {
    dispatch({ type: 'SET_STEP_DATA', step: 2, data: { inputs: data.inputs.filter((i) => i.id !== id) } });
  }

  function updateInput(id: string, field: 'name' | 'description', value: string) {
    dispatch({
      type: 'SET_STEP_DATA',
      step: 2,
      data: {
        inputs: data.inputs.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
      },
    });
  }

  return (
    <div className="card p-6">
      <div className="space-y-3">
        {data.inputs.map((input, idx) => (
          <div key={input.id} className="flex gap-3 items-start fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
            <span className="font-mono text-text-muted text-sm pt-2.5 shrink-0 w-6">#{idx + 1}</span>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                placeholder="Input name (e.g. n, nums, s)"
                value={input.name}
                onChange={(e) => updateInput(input.id, 'name', e.target.value)}
                className="w-full"
              />
              <input
                type="text"
                placeholder="Description (e.g. the number to count up to)"
                value={input.description}
                onChange={(e) => updateInput(input.id, 'description', e.target.value)}
                className="w-full"
              />
            </div>
            <button
              onClick={() => removeInput(input.id)}
              className="text-text-muted hover:text-accent transition-colors pt-2.5 text-sm font-body"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addInput}
        className="mt-4 text-sm font-body text-accent hover:text-accent-hover transition-colors"
      >
        + Add Input
      </button>

      {data.inputs.length === 0 && (
        <p className="text-text-muted text-sm font-body mt-2">Add at least one input to continue.</p>
      )}
    </div>
  );
}

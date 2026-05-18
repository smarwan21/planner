import { useApp } from '../../hooks/useApp';

export default function Step9Optimality() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[9];

  function update(field: string, value: string) {
    dispatch({ type: 'SET_STEP_DATA', step: 9, data: { ...data, [field]: value } });
  }

  return (
    <div className="card p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-body text-text-secondary mb-1.5">
            Time Complexity
          </label>
          <input
            type="text"
            placeholder="e.g. O(n), O(n log n), O(n²)"
            value={data.timeComplexity}
            onChange={(e) => update('timeComplexity', e.target.value)}
            className="w-full font-mono"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-body text-text-secondary mb-1.5">
            Space Complexity
          </label>
          <input
            type="text"
            placeholder="e.g. O(1), O(n), O(n²)"
            value={data.spaceComplexity}
            onChange={(e) => update('spaceComplexity', e.target.value)}
            className="w-full font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-text-secondary mb-1.5">
            Alternative Approaches
          </label>
          <textarea
            placeholder="What other ways could this problem be solved? Are there trade-offs between approaches?"
            value={data.alternatives}
            onChange={(e) => update('alternatives', e.target.value)}
            rows={5}
            className="w-full resize-none font-body"
          />
        </div>
      </div>
    </div>
  );
}

import { useApp } from '../../hooks/useApp';

export default function Step1Understand() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[1];

  return (
    <div className="card p-6">
      <textarea
        value={data.understanding}
        onChange={(e) => dispatch({ type: 'SET_STEP_DATA', step: 1, data: { understanding: e.target.value } })}
        placeholder="Write your understanding of the problem here. What is the goal? What are the constraints? What do you need to compute?"
        rows={8}
        className="w-full resize-none font-body"
        autoFocus
      />
      <p className="text-text-muted text-xs font-body mt-2">
        {data.understanding.length} characters (minimum 10 required)
      </p>
    </div>
  );
}

import { useApp } from '../../hooks/useApp';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { problems } from '../../data/registry';

export default function Step7Implement() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[7];
  const problem = [...problems].find((p) => p.id === state.session!.problemId);
  const starter = problem?.starterCode || '# Write your solution here\n';

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-white/5 px-4 py-2 bg-bg-elevated flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted">solution.py</span>
        <span className="text-xs font-body text-text-muted">Python</span>
      </div>
      <CodeMirror
        value={data.code || starter}
        height="400px"
        theme={oneDark}
        extensions={[python()]}
        onChange={(value) => dispatch({ type: 'SET_STEP_DATA', step: 7, data: { code: value } })}
        basicSetup={{ autocompletion: false, foldGutter: false }}
      />
    </div>
  );
}

import { useApp } from '../../hooks/useApp';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

export default function Step8Verify() {
  const { state, dispatch } = useApp();
  const data = state.session!.stepData[8];

  const placeholder = `# Write tests to verify your solution.
# Think about:
# - Normal cases (typical inputs)
# - Edge cases (empty, extreme, invalid)
# - Boundary conditions

def test_fizzbuzz():
    # assert fizzbuzz(1) == ...
    pass
`;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-white/5 px-4 py-2 bg-bg-elevated flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted">test_solution.py</span>
        <span className="text-xs font-body text-text-muted">Python (pytest style)</span>
      </div>
      <CodeMirror
        value={data.tests || placeholder}
        height="400px"
        theme={oneDark}
        extensions={[python()]}
        onChange={(value) => dispatch({ type: 'SET_STEP_DATA', step: 8, data: { tests: value } })}
        basicSetup={{ autocompletion: false, foldGutter: false }}
      />
      <div className="border-t border-white/5 px-4 py-3 bg-bg-elevated">
        <p className="text-xs text-text-muted font-body">
          These tests won't execute in-app. Copy them to your local environment to run with pytest.
        </p>
      </div>
    </div>
  );
}

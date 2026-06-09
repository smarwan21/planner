import { useApp } from '../../hooks/useApp';
import { Button } from '../ui/Button';
import { Subtask, SubtaskVariable } from '../../types/session';

const DATA_TYPES = ['int', 'float', 'str', 'list', 'tuple', 'dict', 'bool', 'None'] as const;

const PROGRAMMING_CONCEPTS = [
  { key: 'variables', label: 'Variables and assignment' },
  { key: 'conditionals', label: 'Conditionals (if/else)' },
  { key: 'loops', label: 'Loops (while/for)' },
  { key: 'functions', label: 'Functions' },
  { key: 'strings', label: 'Strings and string methods' },
  { key: 'lists', label: 'Lists, tuples, dictionaries' },
  { key: 'file-io', label: 'File input/output' },
  { key: 'recursion', label: 'Recursion' },
  { key: 'error-handling', label: 'Error handling (try/except)' },
  { key: 'math', label: 'Mathematical operations' },
] as const;

function generateId() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function Stage4Decompose() {
  const { state, dispatch } = useApp();
  const data = state.session!.stageData[4];

  function addSubtask() {
    const newSubtask: Subtask = {
      id: generateId(),
      description: '',
      variables: [],
      conceptKeys: [],
    };
    dispatch({
      type: 'SET_STAGE_DATA',
      stage: 4,
      data: { subtasks: [...data.subtasks, newSubtask] },
    });
  }

  function updateSubtask(id: string, updates: Partial<Subtask>) {
    dispatch({
      type: 'SET_STAGE_DATA',
      stage: 4,
      data: {
        subtasks: data.subtasks.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      },
    });
  }

  function removeSubtask(id: string) {
    dispatch({
      type: 'SET_STAGE_DATA',
      stage: 4,
      data: { subtasks: data.subtasks.filter((s) => s.id !== id) },
    });
  }

  function addVariable(subtaskId: string) {
    updateSubtask(subtaskId, {
      variables: [
        ...data.subtasks.find((s) => s.id === subtaskId)!.variables,
        { id: generateId(), name: '', type: 'int' },
      ],
    });
  }

  function updateVariable(subtaskId: string, varId: string, updates: Partial<SubtaskVariable>) {
    updateSubtask(subtaskId, {
      variables: data.subtasks
        .find((s) => s.id === subtaskId)!
        .variables.map((v) => (v.id === varId ? { ...v, ...updates } : v)),
    });
  }

  function removeVariable(subtaskId: string, varId: string) {
    updateSubtask(subtaskId, {
      variables: data.subtasks
        .find((s) => s.id === subtaskId)!
        .variables.filter((v) => v.id !== varId),
    });
  }

  function toggleConcept(subtaskId: string, conceptKey: string) {
    const subtask = data.subtasks.find((s) => s.id === subtaskId)!;
    const updated = subtask.conceptKeys.includes(conceptKey)
      ? subtask.conceptKeys.filter((k) => k !== conceptKey)
      : [...subtask.conceptKeys, conceptKey];
    updateSubtask(subtaskId, { conceptKeys: updated });
  }

  return (
    <div>
      <div className="card p-8 mb-6">
        <div className="flex gap-4 items-start">
          <span className="text-2xl shrink-0 leading-none">💡</span>
          <p className="font-body text-text-secondary text-sm leading-relaxed italic">
            "Senior developers never write 100 lines of code all at once. They break a feature down into micro-steps, map out what kind of data flows through those steps, and decide on the logic structure beforehand."
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.subtasks.map((subtask, idx) => (
          <div key={subtask.id} className="card p-6 fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-base text-text-primary">
                Subtask {idx + 1}
              </h4>
              <button
                onClick={() => removeSubtask(subtask.id)}
                className="text-text-muted hover:text-accent transition-colors text-sm"
              >
                ✕ Remove
              </button>
            </div>

            <div className="mb-4">
              <label className="block font-body text-xs text-text-muted uppercase tracking-wider mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={subtask.description}
                onChange={(e) => updateSubtask(subtask.id, { description: e.target.value })}
                placeholder="e.g., Parse the input string and validate format"
                className="w-full"
                autoFocus={idx === data.subtasks.length - 1}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-body text-xs text-text-muted uppercase tracking-wider">
                  Variables & Data Types
                </label>
                <button
                  onClick={() => addVariable(subtask.id)}
                  className="text-xs text-accent hover:text-accent-hover font-body transition-colors"
                >
                  + Add Variable
                </button>
              </div>
              {subtask.variables.length === 0 && (
                <p className="text-text-muted text-xs font-body italic">
                  No variables defined yet. Think about what data this subtask needs.
                </p>
              )}
              <div className="space-y-2">
                {subtask.variables.map((v) => (
                  <div key={v.id} className="flex gap-2 items-center">
                    <select
                      value={v.type}
                      onChange={(e) =>
                        updateVariable(subtask.id, v.id, { type: e.target.value as SubtaskVariable['type'] })
                      }
                      className="w-28 shrink-0"
                    >
                      {DATA_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => updateVariable(subtask.id, v.id, { name: e.target.value })}
                      placeholder="variable name"
                      className="flex-1"
                    />
                    <button
                      onClick={() => removeVariable(subtask.id, v.id)}
                      className="text-text-muted hover:text-accent transition-colors shrink-0 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-body text-xs text-text-muted uppercase tracking-wider mb-2">
                Logic & Programming Concepts
              </label>
              <div className="flex flex-wrap gap-2">
                {PROGRAMMING_CONCEPTS.map((concept) => {
                  const selected = subtask.conceptKeys.includes(concept.key);
                  return (
                    <button
                      key={concept.key}
                      onClick={() => toggleConcept(subtask.id, concept.key)}
                      className={`text-xs font-body px-3 py-1.5 rounded-full border transition-colors ${
                        selected
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-black/10 text-text-secondary hover:border-text-muted hover:text-text-primary'
                      }`}
                    >
                      {selected ? '✓ ' : ''}{concept.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={addSubtask}
          className="w-full py-3 border-2 border-dashed border-black/10 rounded-lg text-text-muted hover:text-accent hover:border-accent/30 transition-colors font-body text-sm"
        >
          + Add a subtask
        </button>
      </div>

      {data.subtasks.length === 0 && (
        <p className="text-text-muted text-sm font-body mt-3 text-center">
          Break the problem down into smaller logical steps. Add at least one subtask.
        </p>
      )}

      <div className="flex justify-between pt-6 border-t border-black/5 mt-6">
        <Button
          variant="ghost"
          onClick={() => dispatch({ type: 'GO_TO_STAGE', stage: 3 })}
        >
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'FINISH' })}
          disabled={data.subtasks.length < 1}
        >
          Finish Planning →
        </Button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { Button } from '../ui/Button';
import { StageNumber } from '../../types/session';

function generateId() {
  return `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function Stage3RecallConcepts() {
  const { state, dispatch } = useApp();
  const data = state.session!.stageData[3];
  const [input, setInput] = useState('');

  function addConcept() {
    const trimmed = input.trim();
    if (!trimmed) return;
    dispatch({
      type: 'SET_STAGE_DATA',
      stage: 3,
      data: { concepts: [...data.concepts, { id: generateId(), name: trimmed }] },
    });
    setInput('');
  }

  function removeConcept(id: string) {
    dispatch({
      type: 'SET_STAGE_DATA',
      stage: 3,
      data: { concepts: data.concepts.filter((c) => c.id !== id) },
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addConcept();
    }
  }

  return (
    <div>
      <div className="card p-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">💭</span>
            </div>
            <p className="font-body text-text-secondary leading-relaxed">
              Think back to previous assignments, labs, or concepts we've covered. Have you solved a similar problem before? (e.g., interacting with a user, checking conditions, parsing a string).
            </p>
            <p className="font-body text-text-muted text-sm mt-2">
              Briefly note down 1 or 2 concepts or functions you've used in the past that might apply here:
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., using if/else to check conditions"
              className="flex-1"
              autoFocus
            />
            <Button variant="primary" onClick={addConcept} disabled={!input.trim()}>
              Add
            </Button>
          </div>

          {data.concepts.length > 0 && (
            <div className="mt-4 space-y-2">
              {data.concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="flex items-center gap-3 bg-bg-elevated rounded-lg px-4 py-2.5 fade-in"
                >
                  <span className="text-text-muted text-sm">•</span>
                  <span className="flex-1 font-body text-text-primary text-sm">
                    {concept.name}
                  </span>
                  <button
                    onClick={() => removeConcept(concept.id)}
                    className="text-text-muted hover:text-accent transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {data.concepts.length === 0 && (
            <p className="text-text-muted text-sm font-body mt-3 text-center">
              Add at least one concept to continue.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between pt-6 border-t border-black/5 mt-6">
        <Button
          variant="ghost"
          onClick={() => dispatch({ type: 'GO_TO_STAGE', stage: 2 })}
        >
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'COMPLETE_STAGE', stage: 3 })}
          disabled={data.concepts.length < 1}
        >
          Continue to Subtasks →
        </Button>
      </div>
    </div>
  );
}

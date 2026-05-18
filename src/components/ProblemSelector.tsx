import { useState } from 'react';
import { problems } from '../data/registry';
import { useApp } from '../hooks/useApp';
import { ProblemCard } from './ProblemCard';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function ProblemSelector() {
  const { state, dispatch } = useApp();
  const [showCustom, setShowCustom] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const allProblems = [
    ...problems,
    ...state.customProblems.map((cp) => ({
      id: cp.id,
      title: cp.title,
      difficulty: 'medium' as const,
      category: 'Custom',
      description: cp.description,
    })),
  ];

  function handleSelect(id: string) {
    dispatch({ type: 'SELECT_PROBLEM', problemId: id });
  }

  function handleAddCustom() {
    if (!title.trim() || !description.trim()) return;
    const id = `custom-${Date.now()}`;
    dispatch({ type: 'ADD_CUSTOM_PROBLEM', problem: { id, title: title.trim(), description: description.trim() } });
    setTitle('');
    setDescription('');
    setShowCustom(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12 fade-in stagger-1">
        <h1 className="font-display font-bold text-4xl text-text-primary mb-3">
          Choose a Problem
        </h1>
        <p className="text-text-secondary text-lg font-body max-w-xl mx-auto">
          Work through a structured 9-step process to build a complete solution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 fade-in stagger-2">
        {allProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} onSelect={handleSelect} />
        ))}
      </div>

      <div className="text-center fade-in stagger-3">
        {!showCustom ? (
          <Button variant="secondary" onClick={() => setShowCustom(true)}>
            + Custom Problem
          </Button>
        ) : (
          <Card className="max-w-lg mx-auto text-left">
            <h3 className="font-display font-bold text-lg text-text-primary mb-4">
              Create Custom Problem
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Problem title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
              <textarea
                placeholder="Problem description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddCustom} disabled={!title.trim() || !description.trim()}>
                  Add Problem
                </Button>
                <Button variant="ghost" onClick={() => setShowCustom(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

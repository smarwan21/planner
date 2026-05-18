import { Problem } from '../types/problem';
import { Card } from './ui/Card';

const difficultyColors: Record<string, string> = {
  easy: 'text-success border-success/30 bg-success/10',
  medium: 'text-secondary border-secondary/30 bg-secondary/10',
  hard: 'text-accent border-accent/30 bg-accent/10',
};

interface ProblemCardProps {
  problem: Problem;
  onSelect: (id: string) => void;
}

export function ProblemCard({ problem, onSelect }: ProblemCardProps) {
  return (
    <Card as="button" onClick={() => onSelect(problem.id)} className="text-left w-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-bold text-lg text-text-primary">
          {problem.title}
        </h3>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded border ${difficultyColors[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
      </div>
      <p className="text-text-secondary text-sm font-body line-clamp-2 mb-3">
        {problem.description.replace(/\*+/g, '').slice(0, 120)}...
      </p>
      <span className="text-text-muted text-xs font-body">{problem.category}</span>
    </Card>
  );
}

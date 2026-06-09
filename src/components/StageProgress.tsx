import { useApp } from '../hooks/useApp';
import { StageNumber, Session } from '../types/session';

const stageLabels: Record<StageNumber, string> = {
  1: 'Why Planning',
  2: 'The Problem',
  3: 'Recall Concepts',
  4: 'Decompose',
};

export function StageProgress() {
  const { state, dispatch } = useApp();
  const session = state.session as Session;
  if (!state.session) return null;

  const stages: StageNumber[] = [1, 2, 3, 4];

  function canNavigateTo(stage: StageNumber): boolean {
    if (stage <= session.currentStage) return true;
    for (let i = stage - 1; i >= 1; i--) {
      if (!session.completedStages.includes(i as StageNumber)) return false;
    }
    return true;
  }

  return (
    <nav className="w-56 shrink-0 pt-6 hidden md:block">
      <div className="space-y-1">
        {stages.map((stage) => {
          const isActive = session.currentStage === stage;
          const isDone = session.completedStages.includes(stage);
          const canNav = canNavigateTo(stage);

          return (
            <button
              key={stage}
              onClick={() => canNav && dispatch({ type: 'GO_TO_STAGE', stage })}
              disabled={!canNav}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 font-body text-sm
                ${isActive ? 'bg-accent/10 text-accent font-medium' : ''}
                ${isDone && !isActive ? 'text-success' : ''}
                ${!isActive && !isDone && canNav ? 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated' : ''}
                ${!canNav ? 'text-text-muted cursor-not-allowed' : ''}
              `}
            >
              <span className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono shrink-0 border transition-colors duration-200
                ${isActive ? 'border-accent bg-accent/20 text-accent' : ''}
                ${isDone && !isActive ? 'border-success bg-success/20 text-success' : ''}
                ${!isActive && !isDone ? 'border-black/10 bg-bg-card text-text-muted' : ''}
              `}>
                {isDone ? '✓' : stage}
              </span>
              <span className="truncate">{stageLabels[stage]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

import { useApp } from '../hooks/useApp';
import { StepNumber, Session } from '../types/session';

const stepLabels: Record<StepNumber, string> = {
  1: 'Understand',
  2: 'Inputs',
  3: 'Outputs',
  4: 'Types',
  5: 'Decompose',
  6: 'Edge Cases',
  7: 'Implement',
  8: 'Verify',
  9: 'Optimality',
};

export function StepProgress() {
  const { state, dispatch } = useApp();
  const session = state.session as Session;
  if (!state.session) return null;

  const steps: StepNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function canNavigateTo(step: StepNumber): boolean {
    if (step <= session.currentStep) return true;
    for (let i = step - 1; i >= 1; i--) {
      if (!session.completedSteps.includes(i as StepNumber)) return false;
    }
    return true;
  }

  return (
    <nav className="w-56 shrink-0 pt-6 hidden md:block">
      <div className="space-y-1">
        {steps.map((step) => {
          const isActive = session.currentStep === step;
          const isDone = session.completedSteps.includes(step);
          const canNav = canNavigateTo(step);

          return (
            <button
              key={step}
              onClick={() => canNav && dispatch({ type: 'GO_TO_STEP', step })}
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
                ${!isActive && !isDone ? 'border-white/10 bg-bg-card text-text-muted' : ''}
              `}>
                {isDone ? '✓' : step}
              </span>
              <span className="truncate">{stepLabels[step]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

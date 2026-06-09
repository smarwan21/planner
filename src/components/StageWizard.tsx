import { useApp } from '../hooks/useApp';
import { StageProgress } from './StageProgress';
import { StageNumber } from '../types/session';
import { lazy, Suspense } from 'react';

const stages: Record<StageNumber, React.LazyExoticComponent<React.ComponentType>> = {
  1: lazy(() => import('./stages/Stage1WhyPlanning')),
  2: lazy(() => import('./stages/Stage2ProblemStatement')),
  3: lazy(() => import('./stages/Stage3RecallConcepts')),
  4: lazy(() => import('./stages/Stage4Decompose')),
};

const stageTitles: Record<StageNumber, string> = {
  1: 'Why Planning?',
  2: 'The Problem',
  3: 'Recall Prior Concepts',
  4: 'Break Down into Subtasks',
};

const stageDescriptions: Record<StageNumber, string> = {
  1: 'Understanding the value of planning before coding.',
  2: 'Read the problem statement carefully.',
  3: 'Connect this problem to concepts you already know.',
  4: 'Decompose the problem into small, logical micro-steps.',
};

const REMINDER_MESSAGE =
  'Software engineers spend up to 70% of their time planning, reading, and reviewing code — and only 30% actually typing it. As the Lead Architect, your job is to define the logical steps of the program.';

export function StageWizard() {
  const { state, dispatch } = useApp();
  const session = state.session;
  if (!session) return null;

  const stage = session.currentStage;
  const StageComponent = stages[stage];

  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 pt-20 pb-12">
      <StageProgress />
      <main className="flex-1 min-w-0">
        <div key={stage} className="fade-in">
          <div className="relative mb-8">
            <span className="stage-number">{stage}</span>
            <h2 className="font-display font-bold text-2xl text-text-primary relative z-10">
              {stageTitles[stage]}
            </h2>
            <p className="font-body text-text-secondary mt-1 text-sm relative z-10">
              {stageDescriptions[stage]}
            </p>
          </div>

          {stage >= 2 && (
            <div className="card p-5 mb-6 bg-accent/5 border-accent/15 flex items-start gap-4 fade-in">
              <span className="text-xl shrink-0 mt-0.5">🧠</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-text-primary mb-1">
                  Lead Architect
                </p>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {REMINDER_MESSAGE}
                </p>
                <button
                  onClick={() => dispatch({ type: 'GO_TO_STAGE', stage: 1 })}
                  className="font-body text-xs text-accent hover:text-accent-hover underline mt-1.5"
                >
                  Re-read the full message →
                </button>
              </div>
            </div>
          )}

          <Suspense
            fallback={
              <div className="card p-6 text-center text-text-muted font-body">Loading stage...</div>
            }
          >
            <StageComponent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

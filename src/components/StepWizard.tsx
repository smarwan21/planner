import { useApp } from '../hooks/useApp';
import { problems } from '../data/registry';
import { StepProgress } from './StepProgress';
import { Button } from './ui/Button';
import { StepNumber } from '../types/session';
import { lazy, Suspense } from 'react';

const steps = {
  1: lazy(() => import('./steps/Step1Understand')),
  2: lazy(() => import('./steps/Step2Inputs')),
  3: lazy(() => import('./steps/Step3Outputs')),
  4: lazy(() => import('./steps/Step4Types')),
  5: lazy(() => import('./steps/Step5Decompose')),
  6: lazy(() => import('./steps/Step6EdgeCases')),
  7: lazy(() => import('./steps/Step7Implement')),
  8: lazy(() => import('./steps/Step8Verify')),
  9: lazy(() => import('./steps/Step9Optimality')),
};

const stepTitles: Record<StepNumber, string> = {
  1: 'Understand the Problem',
  2: 'Define the Inputs',
  3: 'Define the Outputs',
  4: 'Determine Types of Input / Output',
  5: 'Decompose the Problem',
  6: 'Figure Out Edge Cases',
  7: 'Implement the Solution',
  8: 'Verify the Output',
  9: 'Verify Optimal Solution',
};

const stepDescriptions: Record<StepNumber, string> = {
  1: 'Explain the problem in your own words. What is it asking you to do?',
  2: 'What inputs does your program need? List each one with a name and description.',
  3: 'What outputs will your program produce? List each one with a name and description.',
  4: 'For each input and output you identified, what data type should it be?',
  5: 'Break the problem into smaller sub-problems or steps. How would you solve this step by step?',
  6: 'What unusual or extreme inputs could your program receive? How should it handle them?',
  7: 'Write your Python solution here. Use the starter code as a guide.',
  8: 'Write tests to verify your solution handles normal cases and edge cases correctly.',
  9: 'Analyze your solution: time complexity, space complexity, and alternative approaches.',
};

function StepNavigation({ step, onNext }: { step: StepNumber; onNext: () => void }) {
  const { state, dispatch, isStepComplete } = useApp();
  const session = state.session;
  if (!session) return null;

  const completed = isStepComplete(step);
  const isLast = step === 9;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
      <Button
        variant="ghost"
        onClick={() => dispatch({ type: 'GO_TO_STEP', step: Math.max(1, step - 1) as StepNumber })}
        disabled={step === 1}
      >
        ← Back
      </Button>

      <div className="flex items-center gap-3">
        {!session.completedSteps.includes(step) ? (
          <Button
            variant="primary"
            onClick={() => {
              if (completed || window.confirm('Mark this step as complete and continue?')) {
                dispatch({ type: 'COMPLETE_STEP', step });
              }
            }}
            disabled={!completed && step !== session.currentStep}
          >
            {isLast ? 'Finish →' : 'Complete & Continue →'}
          </Button>
        ) : isLast ? (
          <Button variant="primary" onClick={onNext}>
            View Summary
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => dispatch({ type: 'GO_TO_STEP', step: Math.min(9, step + 1) as StepNumber })}
          >
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}

export function StepWizard() {
  const { state, dispatch } = useApp();
  const session = state.session;
  if (!session) return null;

  const problem = [
    ...problems,
    ...state.customProblems.map((cp) => ({
      ...cp,
      difficulty: 'medium' as const,
      category: 'Custom',
    })),
  ].find((p) => p.id === session.problemId);
  if (!problem) return null;

  const step = session.currentStep;
  const StepComponent = steps[step];

  function handleFinish() {
    dispatch({ type: 'FINISH' });
  }

  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 pt-20 pb-12">
      <StepProgress />
      <main className="flex-1 min-w-0">
        <div key={step} className="fade-in">
          <div className="relative mb-8">
            <span className="step-number">{step}</span>
            <h2 className="font-display font-bold text-2xl text-text-primary relative z-10">
              {stepTitles[step]}
            </h2>
            <p className="font-body text-text-secondary mt-1 text-sm relative z-10">
              {stepDescriptions[step]}
            </p>
          </div>

            <div className="card p-6 mb-4">
                <h3 className="font-display font-semibold text-lg text-accent mb-2">{problem.title}</h3>
                <div className="font-body text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                  {problem.description}
                </div>
                {(problem.sampleInputs?.length || problem.sampleOutputs?.length) && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                    {problem.sampleInputs && problem.sampleInputs.length > 0 && (
                      <div>
                        <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Sample Input</span>
                        <div className="mt-1 bg-bg-elevated rounded px-3 py-2 font-mono text-xs text-text-primary">
                          {problem.sampleInputs.map((inp, i) => (
                            <div key={i}>{inp}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    {problem.sampleOutputs && problem.sampleOutputs.length > 0 && (
                      <div>
                        <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Sample Output</span>
                        <div className="mt-1 bg-bg-elevated rounded px-3 py-2 font-mono text-xs text-text-primary">
                          {problem.sampleOutputs.map((out, i) => (
                            <div key={i}>{out}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

          <Suspense
            fallback={
              <div className="card p-6 text-center text-text-muted font-body">Loading step...</div>
            }
          >
            <StepComponent />
          </Suspense>

          <StepNavigation step={step} onNext={handleFinish} />
        </div>
      </main>
    </div>
  );
}

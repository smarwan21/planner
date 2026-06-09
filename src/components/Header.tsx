import { useApp } from '../hooks/useApp';

export function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-black/5 bg-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="flex items-center gap-2 group"
        >
          <span className="font-display font-bold text-xl text-gradient">P</span>
          <span className="font-body text-text-secondary text-sm hidden sm:inline">
            Planner
          </span>
        </button>

        {state.phase === 'solving' && state.session && (
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-sm font-body">
              Stage {state.session.currentStage} / 4
            </span>
            <button
              onClick={() => {
                if (window.confirm('Reset your progress and go back to problem selection?')) {
                  dispatch({ type: 'RESET' });
                }
              }}
              className="text-text-muted hover:text-text-secondary text-sm font-body transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

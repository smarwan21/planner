import { AppProvider, useApp } from './hooks/useApp';
import { Header } from './components/Header';
import { ProblemSelector } from './components/ProblemSelector';
import { StepWizard } from './components/StepWizard';
import { SummaryView } from './components/SummaryView';

function AppContent() {
  const { state } = useApp();

  return (
    <div className="min-h-screen">
      <Header />
      {state.phase === 'select-problem' && <ProblemSelector />}
      {state.phase === 'solving' && <StepWizard />}
      {state.phase === 'summary' && <SummaryView />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

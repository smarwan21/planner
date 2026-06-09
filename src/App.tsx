import { AppProvider, useApp } from './hooks/useApp';
import { Header } from './components/Header';
import { ProblemSelector } from './components/ProblemSelector';
import { StageWizard } from './components/StageWizard';
import { SummaryView } from './components/SummaryView';

function AppContent() {
  const { state } = useApp();

  return (
    <div className="min-h-screen">
      <Header />
      {state.phase === 'select-problem' && <ProblemSelector />}
      {state.phase === 'solving' && <StageWizard />}
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

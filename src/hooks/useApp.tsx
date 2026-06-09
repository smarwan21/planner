import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction, appReducer, createInitialState } from '../context/AppContext';
import { StageNumber } from '../types/session';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  isStageComplete: (stage: StageNumber) => boolean;
}

const AppCtx = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, createInitialState);

  useEffect(() => {
    localStorage.setItem('planner_state', JSON.stringify(state));
  }, [state]);

  function isStageComplete(stage: StageNumber): boolean {
    if (!state.session) return false;
    switch (stage) {
      case 1:
        return state.session.completedStages.includes(1);
      case 2:
        return state.session.completedStages.includes(2);
      case 3:
        return state.session.stageData[3].concepts.length >= 1;
      case 4:
        return state.session.stageData[4].subtasks.length >= 1;
      default:
        return false;
    }
  }

  return (
    <AppCtx.Provider value={{ state, dispatch, isStageComplete }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

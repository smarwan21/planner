import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction, appReducer, createInitialState } from '../context/AppContext';
import { StepNumber } from '../types/session';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  isStepComplete: (step: StepNumber) => boolean;
}

const AppCtx = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, createInitialState);

  useEffect(() => {
    localStorage.setItem('lvs_state', JSON.stringify(state));
  }, [state]);

  function isStepComplete(step: StepNumber): boolean {
    if (!state.session) return false;
    switch (step) {
      case 1:
        return state.session.stepData[1].understanding.trim().length >= 10;
      case 2:
        return state.session.stepData[2].inputs.length > 0;
      case 3:
        return state.session.stepData[3].outputs.length > 0;
    case 4:
      return state.session.stepData[4].types.length > 0;
    case 5:
      return state.session.stepData[5].decompositionSteps.length >= 2;
      case 6:
        return state.session.stepData[6].edgeCases.length >= 1;
      case 7:
        return state.session.stepData[7].code.trim().length > 0;
      case 8:
        return state.session.stepData[8].tests.trim().length > 0;
      case 9:
        return (
          state.session.stepData[9].timeComplexity.trim().length > 0 &&
          state.session.stepData[9].spaceComplexity.trim().length > 0 &&
          state.session.stepData[9].alternatives.trim().length > 0
        );
      default:
        return false;
    }
  }

  return (
    <AppCtx.Provider value={{ state, dispatch, isStepComplete }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

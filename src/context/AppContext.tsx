import {
  Session,
  StepNumber,
  createEmptySession,
} from '../types/session';

export type Phase = 'select-problem' | 'solving' | 'summary';

export type AppAction =
  | { type: 'SET_PHASE'; phase: Phase }
  | { type: 'SELECT_PROBLEM'; problemId: string }
  | { type: 'RESET' }
  | { type: 'SET_STEP_DATA'; step: StepNumber; data: Record<string, unknown> }
  | { type: 'COMPLETE_STEP'; step: StepNumber }
  | { type: 'GO_TO_STEP'; step: StepNumber }
  | { type: 'FINISH' }
  | { type: 'ADD_CUSTOM_PROBLEM'; problem: CustomProblemData }
  | { type: 'REMOVE_CUSTOM_PROBLEM'; id: string };

export interface CustomProblemData {
  id: string;
  title: string;
  description: string;
  sampleInputs?: string[];
  sampleOutputs?: string[];
  starterCode?: string;
  hints?: string[];
}

export interface AppState {
  phase: Phase;
  session: Session | null;
  customProblems: CustomProblemData[];
}

export function createInitialState(): AppState {
  try {
    const saved = localStorage.getItem('lvs_state');
    if (saved) {
      const parsed = JSON.parse(saved) as AppState;
      return parsed;
    }
  } catch { /* ignore */ }
  return {
    phase: 'select-problem',
    session: null,
    customProblems: [],
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase };

    case 'SELECT_PROBLEM':
      return {
        ...state,
        phase: 'solving',
        session: createEmptySession(action.problemId),
      };

    case 'RESET':
      return {
        phase: 'select-problem',
        session: null,
        customProblems: state.customProblems,
      };

    case 'SET_STEP_DATA': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          stepData: {
            ...state.session.stepData,
            [action.step]: {
              ...state.session.stepData[action.step],
              ...action.data,
            },
          },
        },
      };
    }

    case 'COMPLETE_STEP': {
      if (!state.session) return state;
      const completed = state.session.completedSteps.includes(action.step)
        ? state.session.completedSteps
        : [...state.session.completedSteps, action.step];
      return {
        ...state,
        session: {
          ...state.session,
          completedSteps: completed,
          currentStep: Math.min(action.step + 1, 9) as StepNumber,
        },
      };
    }

    case 'GO_TO_STEP': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          currentStep: action.step,
        },
      };
    }

    case 'FINISH': {
      if (!state.session) return state;
      const completed: StepNumber[] = state.session.completedSteps.includes(9 as StepNumber)
        ? state.session.completedSteps
        : [...state.session.completedSteps, 9 as StepNumber];
      return {
        ...state,
        phase: 'summary',
        session: {
          ...state.session,
          completedSteps: completed,
        },
      };
    }

    case 'ADD_CUSTOM_PROBLEM':
      return {
        ...state,
        customProblems: [...state.customProblems, action.problem],
      };

    case 'REMOVE_CUSTOM_PROBLEM':
      return {
        ...state,
        customProblems: state.customProblems.filter((p) => p.id !== action.id),
      };

    default:
      return state;
  }
}

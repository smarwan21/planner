import {
  Session,
  StageNumber,
  createEmptySession,
} from '../types/session';

export type Phase = 'select-problem' | 'solving' | 'summary';

export type AppAction =
  | { type: 'SET_PHASE'; phase: Phase }
  | { type: 'SELECT_PROBLEM'; problemId: string }
  | { type: 'RESET' }
  | { type: 'SET_STAGE_DATA'; stage: StageNumber; data: Record<string, unknown> }
  | { type: 'COMPLETE_STAGE'; stage: StageNumber }
  | { type: 'GO_TO_STAGE'; stage: StageNumber }
  | { type: 'FINISH' }
  | { type: 'ADD_CUSTOM_PROBLEM'; problem: CustomProblemData }
  | { type: 'REMOVE_CUSTOM_PROBLEM'; id: string };

export interface CustomProblemData {
  id: string;
  title: string;
  description: string;
  markdown: string;
}

export interface AppState {
  phase: Phase;
  session: Session | null;
  customProblems: CustomProblemData[];
}

export function createInitialState(): AppState {
  try {
    const saved = localStorage.getItem('planner_state');
    if (saved) {
      const parsed = JSON.parse(saved) as AppState;
      if (parsed.session && 'currentStage' in parsed.session) {
        return parsed;
      }
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

    case 'SET_STAGE_DATA': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          stageData: {
            ...state.session.stageData,
            [action.stage]: {
              ...state.session.stageData[action.stage],
              ...action.data,
            },
          },
        },
      };
    }

    case 'COMPLETE_STAGE': {
      if (!state.session) return state;
      const completed = state.session.completedStages.includes(action.stage)
        ? state.session.completedStages
        : [...state.session.completedStages, action.stage];
      return {
        ...state,
        session: {
          ...state.session,
          completedStages: completed,
          currentStage: Math.min(action.stage + 1, 4) as StageNumber,
        },
      };
    }

    case 'GO_TO_STAGE': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          currentStage: action.stage,
        },
      };
    }

    case 'FINISH': {
      if (!state.session) return state;
      const completed: StageNumber[] = state.session.completedStages.includes(4 as StageNumber)
        ? state.session.completedStages
        : [...state.session.completedStages, 4 as StageNumber];
      return {
        ...state,
        phase: 'summary',
        session: {
          ...state.session,
          completedStages: completed,
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

export type Phase = 'select-problem' | 'solving' | 'summary';

export type StageNumber = 1 | 2 | 3 | 4;

export interface PlanningConcept {
  id: string;
  name: string;
}

export interface SubtaskVariable {
  id: string;
  name: string;
  type: 'int' | 'float' | 'str' | 'list' | 'tuple' | 'dict' | 'bool' | 'None';
}

export interface Subtask {
  id: string;
  description: string;
  variables: SubtaskVariable[];
  conceptKeys: string[];
}

export interface StageData {
  1: Record<string, never>;
  2: { summary: string };
  3: { concepts: PlanningConcept[] };
  4: { subtasks: Subtask[] };
}

export interface Session {
  problemId: string;
  startedAt: string;
  currentStage: StageNumber;
  completedStages: StageNumber[];
  stageData: StageData;
}

export function createEmptySession(problemId: string): Session {
  return {
    problemId,
    startedAt: new Date().toISOString(),
    currentStage: 1,
    completedStages: [],
    stageData: {
      1: {},
      2: { summary: '' },
      3: { concepts: [] },
      4: { subtasks: [] },
    },
  };
}

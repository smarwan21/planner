export type Phase = 'select-problem' | 'solving' | 'summary';

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface InputOutputField {
  id: string;
  name: string;
  description: string;
}

export interface FieldType {
  fieldId: string;
  fieldName: string;
  type: 'int' | 'float' | 'str' | 'list' | 'tuple' | 'dict' | 'bool' | 'None';
}

export interface EdgeCase {
  id: string;
  description: string;
  expectedBehavior: string;
}

export interface StepData {
  1: { understanding: string };
  2: { inputs: InputOutputField[] };
  3: { outputs: InputOutputField[] };
  4: { types: FieldType[] };
  5: { decompositionSteps: string[] };
  6: { edgeCases: EdgeCase[] };
  7: { code: string };
  8: { tests: string };
  9: { timeComplexity: string; spaceComplexity: string; alternatives: string };
}

export interface Session {
  problemId: string;
  startedAt: string;
  currentStep: StepNumber;
  completedSteps: StepNumber[];
  stepData: StepData;
}

export function createEmptySession(problemId: string): Session {
  return {
    problemId,
    startedAt: new Date().toISOString(),
    currentStep: 1,
    completedSteps: [],
    stepData: {
    1: { understanding: '' },
    2: { inputs: [] },
    3: { outputs: [] },
    4: { types: [] },
    5: { decompositionSteps: [] },
    6: { edgeCases: [] },
      7: { code: '' },
      8: { tests: '' },
      9: { timeComplexity: '', spaceComplexity: '', alternatives: '' },
    },
  };
}

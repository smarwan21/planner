export type Difficulty = 'easy' | 'medium' | 'hard';

export type DataType = 'int' | 'float' | 'str' | 'list' | 'tuple' | 'dict' | 'bool' | 'None';

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  sampleInputs?: string[];
  sampleOutputs?: string[];
  starterCode?: string;
  hints?: string[];
}

export interface InputOutputField {
  id: string;
  name: string;
  description: string;
}

export interface FieldType {
  fieldId: string;
  fieldName: string;
  type: DataType;
}

export interface EdgeCase {
  id: string;
  description: string;
  expectedBehavior: string;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface StepData {
  1: { understanding: string };
  2: { inputs: InputOutputField[] };
  3: { outputs: InputOutputField[] };
  4: { decompositionSteps: string[] };
  5: { types: FieldType[] };
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

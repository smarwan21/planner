import { Session, StepNumber } from '../types/session';

const stepLabels: Record<StepNumber, string> = {
  1: 'Understand the Problem',
  2: 'Define the Inputs',
  3: 'Define the Outputs',
  4: 'Types of Input / Output',
  5: 'Decompose the Problem',
  6: 'Edge Cases',
  7: 'Implementation',
  8: 'Verification (Tests)',
  9: 'Optimality',
};

export function exportToMarkdown(session: Session, problemTitle: string, problemDescription: string): string {
  const d = session.stepData;
  const lines: string[] = [];

  lines.push(`# LearningVerification — ${problemTitle}`);
  lines.push('');
  lines.push(`_Started: ${new Date(session.startedAt).toLocaleString()}_`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Problem Statement');
  lines.push('');
  lines.push(problemDescription);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Step 1
  lines.push(`## 1. ${stepLabels[1]}`);
  lines.push('');
  lines.push(d[1].understanding);
  lines.push('');

  // Step 2
  lines.push(`## 2. ${stepLabels[2]}`);
  lines.push('');
  if (d[2].inputs.length > 0) {
    lines.push('| # | Name | Description |');
    lines.push('|---|------|-------------|');
    d[2].inputs.forEach((inp, idx) => {
      lines.push(`| ${idx + 1} | ${inp.name} | ${inp.description} |`);
    });
  } else {
    lines.push('_No inputs defined._');
  }
  lines.push('');

  // Step 3
  lines.push(`## 3. ${stepLabels[3]}`);
  lines.push('');
  if (d[3].outputs.length > 0) {
    lines.push('| # | Name | Description |');
    lines.push('|---|------|-------------|');
    d[3].outputs.forEach((out, idx) => {
      lines.push(`| ${idx + 1} | ${out.name} | ${out.description} |`);
    });
  } else {
    lines.push('_No outputs defined._');
  }
  lines.push('');

// Step 4
lines.push(`## 4. ${stepLabels[4]}`);
lines.push('');
if (d[4].types.length > 0) {
  lines.push('| Field | Type |');
  lines.push('|-------|------|');
  d[4].types.forEach((t) => {
    lines.push(`| ${t.fieldName} | \`${t.type}\` |`);
  });
} else {
  lines.push('_No types defined._');
}
lines.push('');

// Step 5
lines.push(`## 5. ${stepLabels[5]}`);
lines.push('');
d[5].decompositionSteps.forEach((step, idx) => {
  lines.push(`${idx + 1}. ${step}`);
});
lines.push('');

  // Step 6
  lines.push(`## 6. ${stepLabels[6]}`);
  lines.push('');
  if (d[6].edgeCases.length > 0) {
    lines.push('| Edge Case | Expected Behavior |');
    lines.push('|-----------|-------------------|');
    d[6].edgeCases.forEach((ec) => {
      lines.push(`| ${ec.description} | ${ec.expectedBehavior} |`);
    });
  } else {
    lines.push('_No edge cases defined._');
  }
  lines.push('');

  // Step 7
  lines.push(`## 7. ${stepLabels[7]}`);
  lines.push('');
  lines.push('```python');
  lines.push(d[7].code);
  lines.push('```');
  lines.push('');

  // Step 8
  lines.push(`## 8. ${stepLabels[8]}`);
  lines.push('');
  lines.push('```python');
  lines.push(d[8].tests);
  lines.push('```');
  lines.push('');

  // Step 9
  lines.push(`## 9. ${stepLabels[9]}`);
  lines.push('');
  lines.push('- **Time Complexity**: ' + (d[9].timeComplexity || '_Not specified_'));
  lines.push('- **Space Complexity**: ' + (d[9].spaceComplexity || '_Not specified_'));
  lines.push('- **Alternative Approaches**: ' + (d[9].alternatives || '_Not specified_'));
  lines.push('');

  return lines.join('\n');
}

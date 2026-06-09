import { Session } from '../types/session';
import { Problem } from '../types/problem';

const CONCEPT_LABELS: Record<string, string> = {
  variables: 'Variables and assignment',
  conditionals: 'Conditionals (if/else)',
  loops: 'Loops (while/for)',
  functions: 'Functions',
  strings: 'Strings and string methods',
  lists: 'Lists, tuples, dictionaries',
  'file-io': 'File input/output',
  recursion: 'Recursion',
  'error-handling': 'Error handling (try/except)',
  math: 'Mathematical operations',
};

export function exportToMarkdown(session: Session, problem: Problem): string {
  const d = session.stageData;
  const lines: string[] = [];

  lines.push(`# Planner — Planning: ${problem.title}`);
  lines.push('');
  lines.push(`_Started: ${new Date(session.startedAt).toLocaleString()}_`);
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push('## Problem Statement');
  lines.push('');
  lines.push(problem.markdown);
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push('## Prior Concepts');
  lines.push('');
  if (d[3].concepts.length > 0) {
    d[3].concepts.forEach((c) => {
      lines.push(`- ${c.name}`);
    });
  } else {
    lines.push('_No concepts recorded._');
  }
  lines.push('');

  lines.push('## Subtasks');
  lines.push('');
  if (d[4].subtasks.length > 0) {
    d[4].subtasks.forEach((subtask, idx) => {
      lines.push(`### Subtask ${idx + 1}: ${subtask.description || '*No description*'}`);
      lines.push('');

      if (subtask.variables.length > 0) {
        lines.push('**Variables:**');
        lines.push('');
        lines.push('| Type | Name |');
        lines.push('|------|------|');
        subtask.variables.forEach((v) => {
          lines.push(`| \`${v.type}\` | ${v.name} |`);
        });
        lines.push('');
      }

      if (subtask.conceptKeys.length > 0) {
        lines.push('**Programming Concepts:**');
        subtask.conceptKeys.forEach((key) => {
          lines.push(`- ${CONCEPT_LABELS[key] || key}`);
        });
        lines.push('');
      }

      if (subtask.variables.length === 0 && subtask.conceptKeys.length === 0) {
        lines.push('_No details defined._');
        lines.push('');
      }
    });
  } else {
    lines.push('_No subtasks defined._');
  }

  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

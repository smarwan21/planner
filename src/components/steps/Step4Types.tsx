import { useApp } from '../../hooks/useApp';
import { FieldType, DataType } from '../../types/problem';

const dataTypes: DataType[] = ['int', 'float', 'str', 'list', 'tuple', 'dict', 'bool', 'None'];

export default function Step4Types() {
  const { state, dispatch } = useApp();
  const types = state.session!.stepData[4].types;
  const inputs = state.session!.stepData[2].inputs;
  const outputs = state.session!.stepData[3].outputs;

  const allFields = [
    ...inputs.map((f) => ({ id: f.id, name: f.name || 'Unnamed input', kind: 'input' as const })),
    ...outputs.map((f) => ({ id: f.id, name: f.name || 'Unnamed output', kind: 'output' as const })),
  ];

  function getType(fieldId: string): DataType {
    return types.find((t) => t.fieldId === fieldId)?.type || 'int';
  }

  function setType(fieldId: string, fieldName: string, type: DataType) {
    const existing = types.find((t) => t.fieldId === fieldId);
    let newTypes: FieldType[];
    if (existing) {
      newTypes = types.map((t) => (t.fieldId === fieldId ? { ...t, type } : t));
    } else {
      newTypes = [...types, { fieldId, fieldName, type }];
    }
    dispatch({ type: 'SET_STEP_DATA', step: 4, data: { types: newTypes } });
  }

  if (allFields.length === 0) {
    return (
      <div className="card p-6 text-text-muted text-sm font-body text-center">
        Define inputs and outputs first (steps 2 &amp; 3) to assign types to them.
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="space-y-3">
        {allFields.map((field, idx) => (
          <div key={field.id} className="flex gap-3 items-center fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
            <span className="text-xs font-mono text-text-muted uppercase w-12 shrink-0">
              {field.kind}
            </span>
            <span className="font-body text-sm text-text-primary flex-1">{field.name}</span>
            <select
              value={getType(field.id)}
              onChange={(e) => setType(field.id, field.name, e.target.value as DataType)}
              className="w-28 font-mono text-sm"
            >
              {dataTypes.map((dt) => (
                <option key={dt} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

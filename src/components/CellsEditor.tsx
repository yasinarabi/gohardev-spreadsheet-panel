import { Button, Field } from '@grafana/ui';
import React from 'react';
import { CustomCellOption } from 'types';

export interface EditorProps {
  value: CustomCellOption[];
  onChange: (buttons: CustomCellOption[]) => void;
}

export const CellsEditor: React.FC<EditorProps> = ({ value, onChange }: EditorProps) => {
  return (
    <React.Fragment>
      <Field>
        <Button variant="secondary" icon="plus" size="sm" onClick={() => {}}>
          Add Custom Cell
        </Button>
      </Field>
    </React.Fragment>
  );
};

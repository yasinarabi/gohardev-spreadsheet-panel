import { Button, Collapse, Field, Input, Switch } from '@grafana/ui';
import React, { useState } from 'react';
import { CustomCell } from 'types';

export interface EditorProps {
  value: CustomCell[];
  onChange: (buttons: CustomCell[]) => void;
}

export const CustomCellsEditor: React.FC<EditorProps> = ({ value, onChange }: EditorProps) => {

  const [cells, setCells] = useState<CustomCell[]>(value ? value : []);
  const [isOpen, setOpen] = React.useState<boolean[]>(cells.map((e) => false));

  const updateCells = (index: number, newCell: any) => {
    let currentCell = { ...cells[index] };
    setCells([
      ...cells.slice(0, index),
      {
        ...currentCell, ...newCell
      },
      ...cells.slice(index + 1),
    ]);
    //onChange(cells)
  }

  return (
    <React.Fragment>
      {cells.map((c: CustomCell, i: number) => (
        <Collapse
          key={i}
          label={`Cell ${c.x}, ${c.y}`}
          isOpen={isOpen[i]}
          collapsible
          onToggle={() => {
            setOpen((open) => [...open.slice(0, i), !open[i], ...open.slice(i + 1)]);
          }}
        >
          <Field label="X">
            <Input
              type='number'
              id={'x-' + i.toString()}
              value={c.x}
              placeholder="0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCells(i, { x: parseInt(e.target.value) })}
            />
          </Field>
          <Field label="Y">
            <Input
              type='number'
              id={'y-' + i.toString()}
              value={c.y}
              placeholder="0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCells(i, { y: parseInt(e.target.value) })}
            />
          </Field>
          <Field label="Read Only">
            <Switch
              id={'ro-' + i.toString()}
              value={c.readOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCells(i, { readOnly: e.target.checked })}
            />
          </Field>
          <Field label="Value">
            <Input
              id={'v-' + i.toString()}
              value={c.value}
              placeholder="..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCells(i, { value: e.target.value })}
            />
          </Field>
          <Field label="Class Name">
            <Input
              id={'cn-' + i.toString()}
              value={c.className}
              placeholder="..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCells(i, { className: e.target.value })}
            />
          </Field>
          <Field>
            <>
              <Button
                icon="trash-alt"
                variant="destructive"
                onClick={() => {
                  setCells([...cells.slice(0, i), ...cells.slice(i + 1)]);
                  onChange(cells);
                }}
              >
                Delete
              </Button>
              <Button icon="save" variant="primary" onClick={() => onChange(cells)}>
                Apply
              </Button>
            </>
          </Field>
        </Collapse>
      ))}
      <Field>
        <Button variant="secondary" icon="plus" size="sm" onClick={() => {
          setCells([...cells, { x: 0, y: 0, value: '', readOnly: false }])
          onChange(cells);
        }}>
          Add Custom Cell
        </Button>
      </Field>
    </React.Fragment>
  );
};

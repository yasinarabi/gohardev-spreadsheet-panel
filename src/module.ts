import { PanelPlugin } from '@grafana/data';
import { Options } from './types';
import { SimplePanel } from './components/SimplePanel';
import { CustomCellsEditor } from './components/CustomCellsEditor';


export const plugin = new PanelPlugin<Options>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addNumberInput({
      path: 'width',
      name: 'Width',
      defaultValue: 5,
    })
    .addNumberInput({
      path: 'height',
      name: 'Height',
      defaultValue: 5,
    })
    .addCustomEditor({
      id: 'customCells',
      path: 'customCells',
      name: 'Custom Cells',
      editor: CustomCellsEditor,
    });
});

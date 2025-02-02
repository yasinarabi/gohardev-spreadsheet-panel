import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { Options } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import Spreadsheet, { CellBase, Matrix } from 'react-spreadsheet';

interface Props extends PanelProps<Options> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

function getCells(options: Options, old_data: Matrix<CellBase>) {
  const old_data_width = old_data[0].length;
  const old_data_height = old_data.length;
  console.log(options.customCells)

  let cells: Matrix<CellBase> = [];
  for (let y = 0; y < options.height; y++) {
    let cell_row: (CellBase | undefined)[] = [];
    for (let x = 0; x < options.width; x++) {
      const customCell = options.customCells ? options.customCells.filter(c => c.x === x && c.y === y) : []
      if (customCell.length > 0){
        cell_row = [...cell_row, {value: customCell[0].value, readOnly: customCell[0].readOnly, className:  customCell[0].className }];
      } 
      else if (y < old_data_height && x < old_data_width) {
        cell_row = [...cell_row, old_data[y][x]];
      } else {
        cell_row = [...cell_row, { value: '' }];
      }
    }
    cells = [...cells, cell_row];
  }
  return cells;
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  const [sData, setData] = useState<Matrix<CellBase>>(getCells(options, [[]]));

  useEffect(()=> {
    setData(getCells(options, sData));
  }, [options])

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Spreadsheet data={sData} />
    </div>
  );
};

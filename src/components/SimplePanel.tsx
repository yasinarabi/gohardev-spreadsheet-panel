import React, { useState } from 'react';
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

function getCells(width: number, height: number, old_data: Matrix<CellBase>) {
  const old_data_width = old_data[0].length;
  const old_data_height = old_data.length;

  let cells: Matrix<CellBase> = [];
  for (let y = 0; y < height; y++) {
    let cell_row: (CellBase | undefined)[] = [];
    for (let x = 0; x < height; x++) {
      if (y < old_data_height && x < old_data_width) {
        cell_row = [...cell_row, old_data[y][x]];
      } else {
        cell_row = [...cell_row, { value: `${x}${y}` }];
      }
    }
    cells = [...cells, cell_row];
  }
  return cells;
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  const [sdata, setData] = useState<Matrix<CellBase>>(getCells(options.height, options.width, [[]]));

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
      <Spreadsheet data={sdata} />
    </div>
  );
};

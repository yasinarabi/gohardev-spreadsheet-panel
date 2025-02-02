type ThemeType = "d" | "l"


export interface Options {
  width: number;
  height: number;
  customCells: CustomCell[];
  hideRowIndicators: boolean;
  rowLabels: string;
  hideColumnIndicators: boolean;
  columnLabels: string;
  theme: ThemeType;
  showSaveButton: boolean;
  saveButtonText: string;

}

export interface CustomCell {
  x: number;
  y: number;
  readOnly?: boolean;
  className?: string;
  value?: string;
}
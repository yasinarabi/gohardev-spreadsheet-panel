export interface Options {
  width: number;
  height: number;
  showSaveButton: boolean;
  saveButtonText: string;
}

export interface CustomCellOption {
  x: number;
  y: number;
  readOnly: boolean;
  className: string;
  value: string;
}
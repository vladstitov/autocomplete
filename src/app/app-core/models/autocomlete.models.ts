export interface VOInput {
  text: string;
  input: string;
  position: number;
}

export const VO_INPUT = {
  text: '',
  input: '',
  position: -1
};


export interface VOInputState {
  startSignPosition: number;
  pattern: string;
  isHint: boolean;
}

export const VO_INPUT_STATE: VOInputState = {
  startSignPosition: -1,
  pattern: '',
  isHint: false
};


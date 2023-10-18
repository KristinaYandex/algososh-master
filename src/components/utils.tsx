import { ElementStates } from "../types/element-states";

type TArray = {
  state?: number;
  color: ElementStates;
}

export const swap = (arr: TArray[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export const loading = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
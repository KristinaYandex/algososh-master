import { ElementStates } from "./element-states";

export type TListItem = {
  value: string;
  color: ElementStates;
  topCircle?: boolean;
  bottCircle?: boolean;
  smallCircle?: {
    value: string;
    color: ElementStates
  }
  arrow?: boolean;
}
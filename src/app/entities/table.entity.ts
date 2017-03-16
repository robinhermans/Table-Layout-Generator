import {Chair} from "./chair.entity";

export interface Table {
  id: number,
  chairs: Array<Chair>
}

import {Chair} from "./chair.entity";

export interface Table {
  id: Number,
  chairs: Array<Chair>
}

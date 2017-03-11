import {Table} from "./table.entity";

export interface Course {
  id: Number,
  tables: Array<Table>
}

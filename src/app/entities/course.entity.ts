import { Table } from "./table.entity";

export class Course {
  private _id: number;
  private _tables: Array<Table>;

  constructor(id: number, tables: Array<Table>) {
    this._id = id;
    this._tables = tables;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get tables(): Array<Table> {
    return this._tables;
  }

  public set tables(tables: Array<Table>) {
    this._tables = tables;
  }
}

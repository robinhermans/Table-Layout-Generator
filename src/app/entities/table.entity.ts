import {Chair} from "./chair.entity";

export class Table {
  private _id: number;
  private _chairs: Array<Chair>;

  constructor(id: number, chairs: Array<Chair>){
    this._id = id;
    this._chairs = chairs;
  }

  public get id() : number{
    return this._id
  }

  public set id(id: number){
    this._id = id;
  }

  public get chairs() : Array<Chair>{
    return this._chairs
  }

  public set chairs(chairs: Array<Chair>){
    this._chairs = chairs;
  }
}

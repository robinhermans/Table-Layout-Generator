import {Chair} from "./chair.entity";
import {Vertex} from "./vertex.entity";

export class Table {
  private _id: number;
  private _chairs: Array<Chair>;
  private _vertices: Array<Vertex>;

  constructor(id: number, chairs: Array<Chair>){
    this._id = id;
    this._chairs = chairs;
    this._vertices = new Array<Vertex>();
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

  public get vertices() : Array<Vertex>{
    return this._vertices
  }

  public set vertices(vertices: Array<Vertex>){
    this._vertices = vertices;
  }
}

import { Vertex } from "./vertex.entity"

export class Graph {
  private _id: number;
  private _vertices: Array<Vertex>;

  constructor(id: number, vertices: Array<Vertex>) {
    this._id = id;
    this._vertices = vertices;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get vertices(): Array<Vertex> {
    return this._vertices;
  }

  public set vertices(vertices: Array<Vertex>) {
    this._vertices = vertices;
  }
}
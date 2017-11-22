import { Vertex } from "./vertex.entity"
import { Guest } from "./guest.entity";

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

  public getVertexByValue(guest: Guest): Vertex {
    for (let v = 0; v < this._vertices.length; v++) {
      if (this._vertices[v].value.id == guest.id) {
        return this._vertices[v];
      }
    }
  }
}
import { Guest } from "./guest.entity";
import { Edge } from "./edge.entity";

export class Vertex {
  private _id: number;
  private _name: string;
  private _value: Guest;
  private _edges: Array<Edge>;

  constructor(id: number, name: string, value: Guest) {
    this._id = id;
    this._name = name;
    this._value = value;
    this._edges = new Array();
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get value(): Guest {
    return this._value;
  }

  public set value(value: Guest) {
    this._value = value;
  }

  public get edges(): Array<Edge> {
    return this._edges;
  }

  public set edges(edges: Array<Edge>) {
    this._edges = edges;
  }

  public isLinkedToVertex(vertex: Vertex): boolean {
    for (let e = 0; e < this._edges.length; e++) {
      let edge: Edge = this._edges[e];
      if (vertex.id == edge.value.id) {
        return true;
      }
    }
    return false;
  }

  public getUnvisitedEdge(availableVertices: Array<Vertex>): Edge {
    let unvisitedEdges: Array<Edge> = new Array();
    for (let ue = 0; ue < this._edges.length; ue++) {
      let edge: Edge = this._edges[ue];
      if (!edge.visited && availableVertices.filter(item => item.id == edge.value.id).length == 1) {
        unvisitedEdges.push(edge);
      }
    }
    let index: number = Math.floor(Math.random() * (unvisitedEdges.length));
    index = (index - 1) < 1 ? 1 : index;
    let edge: Edge = unvisitedEdges[index - 1];
    if (edge) {
      edge.visit(this._value);
    }
    return edge;
  }
}
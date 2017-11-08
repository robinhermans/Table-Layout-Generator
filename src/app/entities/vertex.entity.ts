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
}
import { Table } from "./table.entity";
import { Vertex } from "./vertex.entity";
import { Guest } from "./guest.entity";

export class Edge {
	private _id: number;
	private _name: string;
	private _value: Vertex;
	private _visited: boolean;

	constructor(id: number, name: string, value: Vertex, visited: boolean) {
		this._id = id;
		this._name = name;
		this._value = value
		this._visited = visited;
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

	public get value(): Vertex {
		return this._value;
	}

	public set value(value: Vertex) {
		this._value = value;
	}

	public get visited(): boolean {
		return this._visited;
	}

	public set visited(visited: boolean) {
		this._visited = visited;
	}

	public visit(guest: Guest) {
		this._visited = true;
		for (let e = 0; e < this._value.edges.length; e++) {
			let currentEdge: Edge = this._value.edges[e];
			if (currentEdge.visited === false && currentEdge.value.value == guest) {
				currentEdge.visit(this._value.value);
			}
		}
	}
}
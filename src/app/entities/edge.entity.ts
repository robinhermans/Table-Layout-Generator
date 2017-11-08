import { Table } from "./table.entity";
import { Vertex } from "./vertex.entity";

export class Edge {
	private _id: number;
	private _name: string;
	private _left: Vertex;
	private _right: Vertex;
	private _visited: boolean;

	constructor(id: number, name: string, left: Vertex, right: Vertex, visited: boolean) {
		this._id = id;
		this._name = name;
		this._left = left;
		this._right = right;
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

	public get left(): Vertex {
		return this._left;
	}

	public set left(left: Vertex) {
		this._left = left;
	}

	public get right(): Vertex {
		return this._right;
	}

	public set right(right: Vertex) {
		this._right = right;
	}

	public get visited(): boolean {
		return this._visited;
	}

	public set visited(visited: boolean) {
		this._visited = visited;
	}

}
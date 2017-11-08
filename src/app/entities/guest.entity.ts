import {Serializable} from "./serializable.entity";

export class Guest extends Serializable {
  private _id: number;
  private _name: string;
  private _eatsMeat: boolean;
  private _eatsFish: boolean;

  constructor(id: number, name: string, eatsMeat: boolean, eatsFish: boolean) {
    super();
    this._id = id;
    this._name = name;
    this._eatsMeat = eatsMeat;
    this._eatsFish = eatsFish;
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

  public get eatsMeat(): boolean {
    return this._eatsMeat;
  }

  public set eatsMeat(eatsMeat: boolean) {
    this._eatsMeat = eatsMeat;
  }

  public get eatsFish(): boolean {
    return this._eatsFish;
  }

  public set eatsFish(eatsFish: boolean) {
    this._eatsFish = eatsFish;
  }
}

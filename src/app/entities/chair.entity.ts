import { Guest } from "./guest.entity";

export class Chair {
  private _id: number
  private _guest: Guest

  constructor(id: number, guest: Guest) {
    this._id = id;
    this._guest = guest;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get guest(): Guest {
    return this._guest;
  }

  public set guest(guest: Guest) {
    this._guest = guest;
  }
}

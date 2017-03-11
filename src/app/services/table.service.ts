import { Injectable } from '@angular/core';
import {Course} from "../entities/course.entity";
import {Guest} from "../entities/guest.entity";

@Injectable()
export class TableService {

  private _guests: Array<Guest>;
  private _courses: Array<Course>;

  private _tableCount: Number;
  private _courseCount: Number;
  private _neverSameTable: Boolean;
  private _neverSamePeople: Boolean;

  constructor() {
    this._guests = new Array();
    this._courses = new Array();
    this._tableCount = 6;
    this._courseCount = 3;
    this._neverSameTable = true;
    this._neverSamePeople = true;

    this.loadTestData();
  }

  private loadTestData() : void{
    this._guests.push({id: 0, name: "Guest One", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 1, name: "Guest Two", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 2, name: "Guest Three", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 3, name: "Guest Four", eatsMeat: false, eatsFish: false});
    this._guests.push({id: 4, name: "Guest Five", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 5, name: "Guest Six", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 6, name: "Guest Seven", eatsMeat: false, eatsFish: true});
    this._guests.push({id: 7, name: "Guest Eight", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 8, name: "Guest Nine", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 9, name: "Guest Ten", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 10, name: "Guest Eleven", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 11, name: "Guest Twelve", eatsMeat: false, eatsFish: true});
  }

  get guests(): Array<Guest> {
    return this._guests;
  }

  set guests(value: Array<Guest>) {
    this._guests = value;
  }

  get courses(): Array<Course> {
    return this._courses;
  }

  set courses(value: Array<Course>) {
    this._courses = value;
  }

  get tableCount(): Number {
    return this._tableCount;
  }

  set tableCount(value: Number) {
    this._tableCount = value;
  }

  get courseCount(): Number {
    return this._courseCount;
  }

  set courseCount(value: Number) {
    this._courseCount = value;
  }

  get neverSameTable(): Boolean {
    return this._neverSameTable;
  }

  set neverSameTable(value: Boolean) {
    this._neverSameTable = value;
  }

  get neverSamePeople(): Boolean {
    return this._neverSamePeople;
  }

  set neverSamePeople(value: Boolean) {
    this._neverSamePeople = value;
  }
}

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject'
import {Course} from "../entities/course.entity";
import {Guest} from "../entities/guest.entity";
import {Table} from "../entities/table.entity";
import {Algorithm} from "../entities/algorithm.enum";

@Injectable()
export class TableService {

  private _guests: Array<Guest>;
  private _courses: Array<Course>;
  private _currentCourse: number;
  private _tableCount: number;
  private _courseCount: number;
  private _algorithm: Algorithm;
  private _courseSubject: Subject<Array<Course>>;

  constructor() {
    this._guests = new Array();
    this._courses = new Array();
    this._currentCourse = 0;
    this._tableCount = 6;
    this._courseCount = 3;
    this._algorithm = Algorithm.RANDOM;
    this._courseSubject = new Subject();

    this.loadTestData();
    this.generateLayout();
  }

  private loadTestData(): void {
    this._guests.push({id: 1, name: "One", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 2, name: "Two", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 3, name: "Three", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 4, name: "Four", eatsMeat: false, eatsFish: false});
    this._guests.push({id: 5, name: "Five", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 6, name: "Six", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 7, name: "Seven", eatsMeat: false, eatsFish: true});
    this._guests.push({id: 8, name: "Eight", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 9, name: "Nine", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 10, name: "Ten", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 11, name: "Eleven", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 12, name: "Twelve", eatsMeat: false, eatsFish: true});

    this._guests.push({id: 13, name: "Thirteen", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 14, name: "Fourteen", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 15, name: "Fifteen", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 16, name: "Sixteen", eatsMeat: false, eatsFish: false});
    this._guests.push({id: 17, name: "Seventeen", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 18, name: "Eighteen", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 19, name: "Nineteen", eatsMeat: false, eatsFish: true});
    this._guests.push({id: 20, name: "Twenty", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 21, name: "Twenty One", eatsMeat: true, eatsFish: false});
    this._guests.push({id: 22, name: "Twenty Two", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 23, name: "Twenty Three", eatsMeat: true, eatsFish: true});
    this._guests.push({id: 24, name: "Twenty Four", eatsMeat: false, eatsFish: true});
  }

  public redrawLayout(): void {
    this._courseSubject.next(this._courses);
  }

  public generateLayout(): void {
    if (this.guests == null || this.guests.length == 0)
      return;

    this._courses = new Array();

    switch (this._algorithm) {
      case Algorithm.RANDOM:
        for (let c: number = 0; c < this._courseCount; c++) {
          this._courses.push({id: c, tables: this.generateRandom()});
        }
        break;
      case Algorithm.UNIQUE_TABLES:
        return;
      case Algorithm.UNIQUE_GUESTS:
        return;
    }

    this._courseSubject.next(this._courses);
  }

  private generateRandom(): Array<Table> {
    let shuffledGuests = Array.from(this._guests);

    for (let i = shuffledGuests.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [shuffledGuests[i - 1], shuffledGuests[j]] = [shuffledGuests[j], shuffledGuests[i - 1]];
    }

    let tables: Array<Table> = new Array();
    let currentCount: number = 0;

    while (currentCount < shuffledGuests.length) {
      for (let t = 0; t < this._tableCount; t++) {
        let table: Table = tables[t];
        if (!table) {
          table = {id: t + 1, chairs: new Array()} as Table;
        }

        table.chairs.push({id: currentCount, guest: shuffledGuests[currentCount]});

        tables[t] = table;

        currentCount++;
        if (currentCount == shuffledGuests.length) {
          break;
        }
      }
    }

    return tables;
  }

  public addGuest(guest: Guest): void {
    this._guests.push(guest);
    this.generateLayout();
  }

  public removeGuest(id: number): void {
    this._guests.splice(id, 1);
    this.generateLayout();
  }

  get guests(): Array<Guest> {
    return this._guests;
  }

  set guests(value: Array<Guest>) {
    this._guests = value;
    this.generateLayout();
  }

  get courses(): Array<Course> {
    return this._courses;
  }

  set courses(value: Array<Course>) {
    if (this._currentCourse > this._courseCount - 1)
      this._currentCourse = (this._courseCount - 1);

    this._courses = value;
    this.generateLayout();
  }

  get currentCourse(): number {
    return this._currentCourse;
  }

  set currentCourse(value: number) {
    this._currentCourse = value;
    this._courseSubject.next(this._courses);
  }

  get tableCount(): number {
    return this._tableCount;
  }

  set tableCount(value: number) {
    this._tableCount = value;
    this.generateLayout();
  }

  get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(value: number) {
    this._courseCount = value;
    this.generateLayout();
  }

  get algorithm(): Algorithm {
    return this._algorithm;
  }

  set algorithm(value: Algorithm) {
    this._algorithm = value;
    this.generateLayout();
  }

  get courseSubject(): Subject<Array<Course>> {
    return this._courseSubject;
  }

  set courseSubject(value: Subject<Array<Course>>) {
    this._courseSubject = value;
  }
}

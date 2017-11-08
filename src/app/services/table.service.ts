import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Course } from "../entities/course.entity";
import { Guest } from "../entities/guest.entity";
import { Table } from "../entities/table.entity";
import { Algorithm } from "../entities/algorithm.enum";
import { Graph } from "../entities/graph.entity";
import { Vertex } from "../entities/vertex.entity";
import { Edge } from "../entities/edge.entity";
import { Chair } from "../entities/chair.entity";

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
    this._guests.push(new Guest(1, "One", true, true));
    this._guests.push(new Guest(2, "Two", true,  true ));
    this._guests.push(new Guest(3, "Three", true,  true ));
    this._guests.push(new Guest(4, "Four", false,  false ));
    this._guests.push(new Guest(5, "Five", true,  true ));
    this._guests.push(new Guest(6, "Six", true,  false ));
    this._guests.push(new Guest(7, "Seven", false,  true ));
    this._guests.push(new Guest(8, "Eight", true,  true ));
    this._guests.push(new Guest(9, "Nine", true,  false ));
    this._guests.push(new Guest(10, "Ten", true,  true ));
    this._guests.push(new Guest(11, "Eleven", true,  true ));
    this._guests.push(new Guest(12, "Twelve", false,  true ));

    this._guests.push(new Guest(13, "Thirteen",  true,  true ));
    this._guests.push(new Guest(14, "Fourteen",  true,  true ));
    this._guests.push(new Guest(15, "Fifteen",  true,  true ));
    this._guests.push(new Guest(16, "Sixteen",  false,  false ));
    this._guests.push(new Guest(17, "Seventeen",  true,  true ));
    this._guests.push(new Guest(18, "Eighteen",  true,  false ));
    this._guests.push(new Guest(19, "Nineteen",  false,  true ));
    this._guests.push(new Guest(20, "Twenty",  true,  true ));
    this._guests.push(new Guest(21, "Twenty One",  true,  false ));
    this._guests.push(new Guest(22, "Twenty Two",  true,  true ));
    this._guests.push(new Guest(23, "Twenty Three",  true,  true ));
    this._guests.push(new Guest(24, "Twenty Four",  false,  true ));
  }

  public redrawLayout(): void {
    this._courseSubject.next(this._courses);
  }

  public generateLayout(): void {
    this._courses = new Array();

    if (this.guests != null && this.guests.length > 0) {
      switch (this._algorithm) {
        case Algorithm.RANDOM:
          for (let c: number = 0; c < this._courseCount; c++) {
            this._courses.push(new Course(c, this.generateRandom() ));
          }
          break;
        case Algorithm.UNIQUE_TABLES:
          return;
        case Algorithm.UNIQUE_GUESTS:
          return;
      }
    } else {
      for (let c: number = 0; c < this._courseCount; c++) {
        this._courses.push(new Course(c, new Array() ));
      }
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
          table = new Table(t + 1, new Array());
        }

        table.chairs.push(new Chair(currentCount, shuffledGuests[currentCount] ));

        tables[t] = table;

        currentCount++;
        if (currentCount == shuffledGuests.length) {
          break;
        }
      }
    }

    return tables;
  }

  private generateGuestGraph(): Graph {
    let graph: Graph = new Graph(1, new Array());

    let vertices: Array<Vertex> = new Array();
    for (let i = 0; this._guests.length; i++) {
      let guest = this._guests[i];
      let vertex: Vertex = new Vertex(vertices.length, guest.name, guest);
      vertices.push()
    }

    return graph;
  }

  public addGuest(guest: Guest): void {
    this._guests.push(guest);
    this.generateLayout();
  }

  public removeGuest(id: number): void {
    this._guests.splice(id, 1);
    if (this._guests.length != 0 && this._guests.length < this._tableCount)
      this._tableCount = this._guests.length;
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
    if (this._guests.length != 0 && this._tableCount > this._guests.length)
      this._tableCount = this._guests.length;
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

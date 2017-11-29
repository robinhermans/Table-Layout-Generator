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
    this._tableCount = 3;
    this._courseCount = 3;
    this._algorithm = Algorithm.RANDOM;
    this._courseSubject = new Subject();

    this.loadTestData();
    this.generateLayout();
  }

  private loadTestData(): void {
    this._guests.push(new Guest(0, "One", true, true));
    this._guests.push(new Guest(1, "Two", true, true));
    this._guests.push(new Guest(2, "Three", true, true));
    this._guests.push(new Guest(3, "Four", false, false));
    this._guests.push(new Guest(4, "Five", true, true));
    this._guests.push(new Guest(5, "Six", true, false));
    this._guests.push(new Guest(6, "Seven", false, true));
    this._guests.push(new Guest(7, "Eight", true, true));
    this._guests.push(new Guest(8, "Nine", true, false));
    this._guests.push(new Guest(9, "Ten", true, true));
    this._guests.push(new Guest(10, "Eleven", true, true));
    this._guests.push(new Guest(11, "Twelve", false, true));

    this._guests.push(new Guest(12, "Thirteen", true, true));
    this._guests.push(new Guest(13, "Fourteen", true, true));
    this._guests.push(new Guest(14, "Fifteen", true, true));
    this._guests.push(new Guest(15, "Sixteen", false, false));
    this._guests.push(new Guest(16, "Seventeen", true, true));
    this._guests.push(new Guest(17, "Eighteen", true, false));
    this._guests.push(new Guest(18, "Nineteen", false, true));
    this._guests.push(new Guest(19, "Twenty", true, true));
    this._guests.push(new Guest(20, "Twenty One", true, false));
    this._guests.push(new Guest(21, "Twenty Two", true, true));
    this._guests.push(new Guest(22, "Twenty Three", true, true));
    this._guests.push(new Guest(23, "Twenty Four", false, true));
  }

  public redrawLayout(): void {
    this._courseSubject.next(this._courses);
  }

  public generateLayout(): void {
    this.allowUniqueGuests();
    this.allowUniqueTables();

    this._courses = new Array();
    if (this.guests != null && this.guests.length > 0) {
      switch (this._algorithm) {
        case Algorithm.RANDOM:
          for (let c: number = 0; c < this._courseCount; c++) {
            this._courses.push(new Course(c + 1, this.generateRandom()));
          }
          break;
        case Algorithm.UNIQUE_TABLES:
          this._courses = this.generateUniqueTables();
          break;
        case Algorithm.UNIQUE_GUESTS:
          this._courses = this.generateUniqueGuests();
          break;
      }
    } else {
      for (let c: number = 0; c < this._courseCount; c++) {
        this._courses.push(new Course(c, new Array()));
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
          table = new Table(t, new Array());
        }

        table.chairs.push(new Chair(currentCount, shuffledGuests[currentCount]));

        tables[t] = table;

        currentCount++;
        if (currentCount == shuffledGuests.length) {
          break;
        }
      }
    }

    return tables;
  }

  private generateUniqueGuests(): Array<Course> {
    let graph: Graph = new Graph(0, new Array());

    let vertices: Array<Vertex> = new Array();
    for (let g = 0; g < this._guests.length; g++) {
      let guest: Guest = this._guests[g];
      vertices.push(new Vertex(g, guest.name, guest));
    }

    graph.vertices = vertices;

    for (let ov = 0; ov < graph.vertices.length; ov++) {
      let outerVertex: Vertex = graph.vertices[ov];
      for (let iv = 0; iv < graph.vertices.length; iv++) {
        let innerVertex: Vertex = graph.vertices[iv];
        if (innerVertex !== outerVertex) {
          if (!outerVertex.isLinkedToVertex(innerVertex)) {
            let name: string = outerVertex.name + " - " + innerVertex.name;
            outerVertex.edges.push(new Edge((ov + iv), name, innerVertex, false));
          }
        }
      }
    }

    let courses: Array<Course> = new Array();
    for (let c = 0; c < this._courseCount; c++) {

      let shuffledVertices: Array<Vertex> = Array.from(graph.vertices);
      for (let i = shuffledVertices.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [shuffledVertices[i - 1], shuffledVertices[j]] = [shuffledVertices[j], shuffledVertices[i - 1]];
      }

      let visitedVertices: Array<Vertex> = new Array();
      let currentCount: number = 0;
      let tables: Array<Table> = new Array();

      while (currentCount < shuffledVertices.length) {
        for (let t = 0; t < this._tableCount; t++) {
          let table: Table = tables[t];
          if (!table) {
            table = new Table(t, new Array());
          }

          let guests: Array<Number> = table.chairs.map(chair => chair.guest).map(guest => guest.id);
          let tableGuests: Array<Vertex> = shuffledVertices.filter(suffledVertex => guests.indexOf(suffledVertex.value.id) >= 0);
          let availableVertices: Array<Vertex> = shuffledVertices.filter(item => visitedVertices.map(vertex => vertex.id).indexOf(item.id) < 0);

          let vertex: Vertex;
          if (table.chairs.length === 0) {
            vertex = availableVertices[0];
          } else {
            let suitableVertices: Array<Vertex> = new Array();
            tableGuests.forEach(tableGuest => {
              tableGuest.edges.filter(edge => !edge.visited).map(edge => edge.value).forEach(edgeVertex => {
                suitableVertices.push(edgeVertex);
              });
            });
            suitableVertices = suitableVertices.filter((x, i, a) => a.indexOf(x) == i).filter(suitableVertex => availableVertices.indexOf(suitableVertex) >= 0);
            let index: number = Math.floor(Math.random() * (suitableVertices.length));
            index = (index - 1) < 1 ? 1 : index;
            vertex = suitableVertices[index - 1];
          }

          if (!vertex) {
            return this.generateUniqueGuests();
          }

          tableGuests.forEach(tableGuest => {
            tableGuest.edges.forEach(edge => {
              if (edge.value.id === vertex.id) {
                edge.visit(vertex.value);
              }
            });
          });

          visitedVertices.push(vertex);
          table.chairs.push(new Chair(currentCount, vertex.value));
          tables[t] = table;

          currentCount++;
          if (currentCount == shuffledVertices.length) {
            break;
          }
        }
      }
      courses.push(new Course(c + 1, tables));
    }
    return courses;
  }

  private generateUniqueTables(): Array<Course> {
    let tables: Array<Table> = new Array();
    for (let t = 0; t < this._tableCount; t++) {
      tables.push(new Table(t, new Array<Chair>()));
    }

    let tableMap: Map<Guest, Array<Table>> = new Map();
    this.guests.forEach(guest => {
      tableMap.set(guest, Array.from(tables));
    });

    let courses: Array<Course> = new Array();
    for (let c: number = 0; c < this._courseCount; c++) {
      let currentCount: number = 0;
      let courseTables: Array<Table> = new Array();
      let visitedGuests: Array<Guest> = new Array();
      while (currentCount < tableMap.size) {
        for (let t = 0; t < this._tableCount; t++) {
          let table: Table = courseTables[t];
          if (!table) {
            table = new Table(t, new Array());
          }

          let availableGuests: Array<Guest> = new Array();
          tableMap.forEach((guestTables: Array<Table>, guest: Guest) => {
            if (!visitedGuests.find(visitedGuest => visitedGuest.id === guest.id) && guestTables.find(guestTable => guestTable.id === table.id)) {
              availableGuests.push(guest);
            }
          });

          if (availableGuests.length === 0) {
            return this.generateUniqueTables();
          }

          let guest: Guest = availableGuests[Math.floor(Math.random() * availableGuests.length)];
          table.chairs.push(new Chair(currentCount, guest));
          courseTables[t] = table;
          visitedGuests.push(guest);

          let guestTable = tableMap.get(guest);
          guestTable.splice(guestTable.findIndex(element => element.id === table.id), 1);

          currentCount++;
          if (currentCount == tableMap.size) {
            break;
          }
        }
      }
      courses.push(new Course(c + 1, courseTables));
    }
    return courses;
  }

  public allowUniqueGuests(): boolean {
    if (this._guests.length > this._tableCount) {
      let guestsPerTable: number = Math.ceil(this._guests.length / this._tableCount);
      if (guestsPerTable > this._tableCount) {
        if (this._algorithm == Algorithm.UNIQUE_GUESTS) {
          this._algorithm = Algorithm.RANDOM;
        }
        return false;
      }
    }
    return true;
  }

  public allowUniqueTables(): boolean {
    if (this._courseCount <= this._tableCount) {
      return true;
    } else {
      if (this._algorithm == Algorithm.UNIQUE_TABLES) {
        this._algorithm = Algorithm.RANDOM;
      }
      return false;
    }
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
    if (this._currentCourse > this._courseCount - 1) {
      this._currentCourse = (this._courseCount - 1);
    }

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
    if (this._guests.length != 0 && this._tableCount > this._guests.length) {
      this._tableCount = this._guests.length;
    }
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

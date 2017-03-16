import {Component, ViewChild, ElementRef} from '@angular/core';
import {TableService} from "../../services/table.service";
import {Table} from "../../entities/table.entity";
import {Course} from "../../entities/course.entity";

@Component({
  selector: 'canvas-component',
  styleUrls: ['./canvas.component.css'],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent {

  @ViewChild("screen")
  private _screen: ElementRef;

  private _tableService: TableService;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _tableImage: any;
  private _chairImage: any;

  constructor(tableService: TableService) {
    this._tableService = tableService;

    this._tableService.courseSubject.subscribe(() => {
      this.draw();
    });
  }

  ngAfterViewInit() {
    this._context = this._screen.nativeElement.getContext("2d");
    this._width = this._context.canvas.offsetWidth;
    this._height = this._context.canvas.offsetHeight;
    this._screen.nativeElement.width = this._width;
    this._screen.nativeElement.height = this._height;

    let self = this;

    this._tableImage = new Image();
    this._tableImage.onload = function () {
      self._chairImage = new Image();
      self._chairImage.onload = function () {
        self.draw();
      };
      self._chairImage.src = "assets/images/chair.png";
    };
    this._tableImage.src = "assets/images/table.png";
  }

  private draw() {
    this._context.clearRect(0, 0, this._width, this._height);

    let currentCourse: Course = this._tableService.courses[this._tableService.currentCourse];
    let tables: Array<Table> = currentCourse.tables;
    let yStep: number = this._height / 3;
    let xStep: number = this._width / Math.ceil(this._tableService.tableCount / 3);
    let currentCount: number = 0;

    while (currentCount < this._tableService.tableCount) {

      if (tables.length == 1) {
        this.drawTable(xStep / 2, yStep * 1.5, tables[currentCount]);
        break;
      } else {
        if (tables.length == 2) {
          this.drawTable(xStep / 2, yStep, tables[currentCount]);
          this.drawTable(xStep / 2, yStep * 2, tables[currentCount]);
          currentCount += 2;
          break;
        } else {
          for (let i: number = 0; i < 3; i++) {
            let x: number = (xStep / 2) + (Math.floor(currentCount / 3) * xStep);
            let y: number = (yStep / 2) + (i * yStep);

            this.drawTable(x, y, tables[currentCount]);

            currentCount++;
            if (currentCount == this._tableService.tableCount) {
              break;
            }
          }
        }
      }
    }
  }

  private drawTable(x: number, y: number, table: Table) {
    this._context.drawImage(this._tableImage, x - 64, y - 64);

    this._context.font = "24px Arial";
    this._context.textAlign = "center";
    this._context.fillText("Table " + table.id, x, y + 8);

    let rotation: number = 0;
    let step = Math.PI * 2 / table.chairs.length;

    this._context.translate(x, y);

    for (var count = 0; count < table.chairs.length; count++) {
      this._context.rotate(step);
      rotation += step;

      this._context.drawImage(this._chairImage, 70, -16);

      let name: string = table.chairs[count].guest.name;
      if (rotation >= (Math.PI / 2) && rotation <= (Math.PI * 1.5)) {
        this._context.rotate(Math.PI);
        this._context.font = "14px Arial";
        this._context.textAlign = "left";
        this._context.fillText(name, -95 - this._context.measureText(name).width, 5);
        this._context.rotate(-Math.PI);
      } else {
        this._context.font = "14px Arial";
        this._context.textAlign = "left";
        this._context.fillText(name, 95, 5);
      }
    }

    this._context.setTransform(1, 0, 0, 1, 0, 0);
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}

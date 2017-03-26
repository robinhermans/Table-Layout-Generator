import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import {TableService} from "../../services/table.service";
import {Table} from "../../entities/table.entity";
import {Course} from "../../entities/course.entity";
import {Chair} from "../../entities/chair.entity";

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
  private _plateImage: any;
  private _fishImage: any;
  private _meatImage: any;
  private _fishMeatImage: any;

  constructor(tableService: TableService) {
    this._tableService = tableService;

    this._tableService.courseSubject.subscribe(() => {
      this.draw();
    });
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    this.ngAfterViewInit();
  }

  private ngAfterViewInit(): void {
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
        self._plateImage = new Image();
        self._plateImage.onload = function () {
          self._fishImage = new Image();
          self._fishImage.onload = function () {
            self._meatImage = new Image();
            self._meatImage.onload = function () {
              self._fishMeatImage = new Image();
              self._fishMeatImage.onload = function () {
                self.draw();
              }
              self._fishMeatImage.src = "assets/images/fishmeat.png";
            }
            self._meatImage.src = "assets/images/meat.png";
          }
          self._fishImage.src = "assets/images/fish.png";
        }
        self._plateImage.src = "assets/images/plate.png";
      };
      self._chairImage.src = "assets/images/chair.png";
    };
    this._tableImage.src = "assets/images/table.png";
  }

  private draw() {
    this._context.clearRect(0, 0, this._width, this._height);

    let currentCourse: Course = this._tableService.courses[this._tableService.currentCourse];
    let tables: Array<Table> = currentCourse.tables;
    let tableCount: number = tables.length;
    let yStep: number = this._height / 3;
    let xStep: number = this._width / Math.ceil(tableCount / 3);
    let currentCount: number = 0;

    while (currentCount < tableCount) {

      if (tables.length == 1) {
        this.drawTable(xStep / 2, yStep * 1.5, tables[currentCount]);
        break;
      } else {
        if (tables.length == 2) {
          this.drawTable(xStep / 2, yStep, tables[currentCount]);
          this.drawTable(xStep / 2, yStep * 2, tables[currentCount+1]);
          currentCount += 2;
          break;
        } else {
          for (let i: number = 0; i < 3; i++) {
            let x: number = (xStep / 2) + (Math.floor(currentCount / 3) * xStep);
            let y: number = (yStep / 2) + (i * yStep);

            this.drawTable(x, y, tables[currentCount]);

            currentCount++;
            if (currentCount == tableCount) {
              break;
            }
          }
        }
      }
    }
  }

  private drawTable(x: number, y: number, table: Table) {
    let randomRotate: number = Math.random() * (8 - 1) + 1;
    console.log(randomRotate);
    this._context.save();
    this._context.translate(x, y);
    this._context.rotate(((Math.PI/ 4) * randomRotate));
    this._context.drawImage(this._tableImage, - 64, - 64);
    this._context.restore();

    this._context.fillStyle = "white";
    this._context.font = "24px Roboto";
    this._context.textAlign = "center";
    this._context.fillText("Table " + table.id, x, y + 8);

    let rotation: number = Math.PI / 4;
    let step = Math.PI * 2 / table.chairs.length;

    this._context.save();
    this._context.translate(x, y);
    this._context.rotate(rotation);

    for (var count = 0; count < table.chairs.length; count++) {
      this._context.rotate(step);
      rotation += step;

      let chair: Chair = table.chairs[count];

      this._context.drawImage(this._chairImage, 70, -16);
      this._context.drawImage(this._plateImage, 45, -9);

      if(chair.guest.eatsFish && chair.guest.eatsMeat){
        this._context.drawImage(this._fishMeatImage, 50, -8);
      }
      if(chair.guest.eatsFish && !chair.guest.eatsMeat){
        this._context.drawImage(this._fishImage, 50, -8);
      }
      if(!chair.guest.eatsFish && chair.guest.eatsMeat){
        this._context.drawImage(this._meatImage, 50, -8);
      }

      let name: string = chair.guest.name;
      this._context.fillStyle = "black";
      this._context.font = "14px Roboto";
      this._context.textAlign = "left";
      if (rotation >= (Math.PI / 2) && rotation <= (Math.PI * 1.5)) {
        this._context.rotate(Math.PI);
        this._context.fillText(name, -95 - this._context.measureText(name).width, 5);
        this._context.rotate(-Math.PI);
      } else {
        this._context.fillText(name, 95, 5);
      }
    }

    this._context.restore();
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}

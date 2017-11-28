import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PdfService } from "../../services/pdf.service";
import { Guest } from "../../entities/guest.entity";
import { Position } from '../../entities/position.enum';

@Component({
  selector: 'generator-component',
  styleUrls: ['./generator.component.css'],
  templateUrl: './generator.component.html',
})
export class GeneratorComponent {

  @ViewChild("preview")
  private _preview: ElementRef;

  private _dialogReference: MatDialogRef<GeneratorComponent>;
  private _pdfService: PdfService;
  private _tablePrefix: String;
  private _cardBackground: any;
  private _backgroundPosition: Position;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _borderImage: any;

  constructor(dialogReference: MatDialogRef<GeneratorComponent>, pdfService: PdfService) {
    this._dialogReference = dialogReference;
    this._pdfService = pdfService;
    this._tablePrefix = "Table";
    this._backgroundPosition = Position.TOP_LEFT;
  }

  private ngAfterViewInit(): void {
    this._context = this._preview.nativeElement.getContext("2d");
    this._width = this._context.canvas.offsetWidth;
    this._height = this._context.canvas.offsetHeight;
    this._preview.nativeElement.width = this._width;
    this._preview.nativeElement.height = this._height;

    let self = this;

    this._borderImage = new Image();
    this._borderImage.onload = function () {
      self.drawPreview();
    }
    this._borderImage.src = "assets/images/border.svg"
  }

  public drawPreview(): void {
    this._context.clearRect(0, 0, this._width, this._height);

    if (this._cardBackground) {
      let w, h = 0;
      if (this._cardBackground.width >= this._cardBackground.height) {
        let aspectRatio = this._cardBackground.height / this._cardBackground.width;
        w = this._width * 0.15;
        h = w * aspectRatio;
      } else {
        let aspectRatio = this._cardBackground.width / this._cardBackground.height;
        h = this._height * 0.15;
        w = h * aspectRatio;
      }

      switch (this._backgroundPosition) {
        case Position.TOP_LEFT:
          this._context.drawImage(this._cardBackground, 20, 10, w, h);
          break;
        case Position.TOP_RIGHT:
          this._context.drawImage(this._cardBackground, this._width - (w + 20), 10, w, h);
          break;
        case Position.BOTTOM_LEFT:
          this._context.drawImage(this._cardBackground, 50, this._height - (h + 25), w, h);
          break;
        case Position.BOTTOM_RIGHT:
          this._context.drawImage(this._cardBackground, this._width - (w + 50), this._height - (h + 25), w, h);
          break;
      }
    }

    this._context.drawImage(this._borderImage, (this._width / 2) - 140, this._height - 25, 280, 20);

    this._context.textAlign = "center";
    this._context.fillStyle = "black";
    this._context.font = "bold 24px Amatic SC";
    this._context.fillText("Guest One", (this._width / 2), 40);
    this._context.fillText("Guest Two", (this._width / 2), 75);
    this._context.fillText("Guest Three", (this._width / 2), 110);

    this._context.font = "bolder 18px Amatic SC";
    let wPos = this._backgroundPosition === Position.BOTTOM_LEFT ? 0.75 : 0.25
    this._context.fillText(this._tablePrefix + " " + 1, (this._width * wPos), this._height - 20);

    this._context.fillStyle = "black";
    this._context.rect(0, 0, this._width, this._height);
    this._context.stroke();
  }

  public uploadImage(event): void {
    var reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      var src = e.target['result'];
      self._cardBackground = new Image();
      self._cardBackground.onload = function () {
        self.drawPreview();
      }
      self._cardBackground.src = src;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  public setPosition(position: string) {
    this._backgroundPosition = Position[position];
    this.drawPreview();
  }

  public generateCards(): void {
    this._pdfService.generatePdf(this._tablePrefix, this._cardBackground, this._backgroundPosition);
  }

  public close(): void {
    this._dialogReference.close(null);
  }

  get tablePrefix(): String {
    return this._tablePrefix
  }

  set tablePrefix(tablePrefix: String) {
    this._tablePrefix = tablePrefix;
  }

  get cardBackground(): any {
    return this._cardBackground
  }

  set cardBackground(cardBackground: any) {
    this._cardBackground = cardBackground;
  }

  get backgroundPosition(): Position {
    return this._backgroundPosition
  }

  set backgroundPosition(backgroundPosition: Position) {
    this._backgroundPosition = backgroundPosition;
  }
}
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TableService } from "../../services/table.service";
import { Guest } from "../../entities/guest.entity";
import { Logo } from '../../entities/logo.enum';

@Component({
  selector: 'generator-component',
  styleUrls: ['./generator.component.css'],
  templateUrl: './generator.component.html',
})
export class GeneratorComponent {

  @ViewChild("preview")
  private _preview: ElementRef;

  private _dialogReference: MatDialogRef<GeneratorComponent>;
  private _tableService: TableService;
  private _tablePrefix: String;
  private _cardLogo: any;
  private _logoPosition: Logo;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _borderImage: any;

  constructor(dialogReference: MatDialogRef<GeneratorComponent>, tableService: TableService) {
    this._dialogReference = dialogReference;
    this._tableService = tableService;
    this._tablePrefix = "Table";
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
    this._borderImage.src = "assets/images/border.png"
  }

  public drawPreview(): void {
    console.log(this._cardLogo);
    this._context.clearRect(0, 0, this._width, this._height);

    this._context.drawImage(this._borderImage, (this._width / 2) - 140, this._height - 25, 280, 20);

    this._context.textAlign = "center";
    this._context.fillStyle = "black";
    this._context.font = "bold 24px Amatic SC";
    this._context.fillText("Guest One", (this._width /2), 40);
    this._context.fillText("Guest Two", (this._width /2), 75);
    this._context.fillText("Guest Three", (this._width /2), 110);

    this._context.font = "bolder 18px Amatic SC";
    this._context.fillText(this._tablePrefix + " " + 1, (this._width * 0.25), this._height - 20);

    this._context.fillStyle = "black";
    this._context.rect(0, 0, this._width, this._height);
    this._context.stroke();
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

  get cardLogo(): any {
    return this._cardLogo
  }

  set cardLogo(cardLogo: any) {
    this._cardLogo = cardLogo;
  }

  get logoPosition(): Logo {
    return this._logoPosition
  }

  set logoPosition(logoPosition: Logo) {
    this._logoPosition = logoPosition;
  }

  get tableService(): TableService {
    return this._tableService;
  }

  set tableService(value: TableService) {
    this._tableService = value;
  }
}
import { Component, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { TableService } from "../../services/table.service";
import { GuestComponent } from "../guest/guest.component";
import { PdfService } from "../../services/pdf.service";
import { Algorithm } from "../../entities/algorithm.enum";
import { GeneratorComponent } from '../generator/generator.component';

@Component({
  selector: 'sidebar-component',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SidebarComponent {

  private _guestDialogRef: MatDialogRef<GuestComponent>;
  private _generatorDialogRef: MatDialogRef<GeneratorComponent>;
  private _dialog: MatDialog;
  private _viewContainerRef: ViewContainerRef;
  private _tableService: TableService;
  private _pdfService: PdfService;

  constructor(tableService: TableService, pdfService: PdfService, dialog: MatDialog) {
    this._pdfService = pdfService;
    this._tableService = tableService;
    this._dialog = dialog;
  }

  public openGuestsDialog(): void {
    let config = new MatDialogConfig();
    config.viewContainerRef = this._viewContainerRef;

    this._guestDialogRef = this._dialog.open(GuestComponent, config);

    this._guestDialogRef.afterClosed().subscribe(result => {
      this._tableService.redrawLayout();
      this._guestDialogRef = null;
    });
  }

  public openGeneratorDialog(): void {
    let config = new MatDialogConfig();
    config.viewContainerRef = this._viewContainerRef;

    this._generatorDialogRef = this._dialog.open(GeneratorComponent, config);

    this._generatorDialogRef.afterClosed().subscribe(result => {
      this._generatorDialogRef = null;
    });
  }

  public isAlgorithmActive(algorithm: string): boolean {
    return (Algorithm[algorithm] === this._tableService.algorithm);
  }

  public setActiveAlgorithm(algorithm: string): void {
    this._tableService.algorithm = Algorithm[algorithm];
  }

  get tableService(): TableService {
    return this._tableService;
  }

  get pdfService(): PdfService {
    return this._pdfService;
  }
}

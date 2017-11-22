import { Component, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { TableService } from "../../services/table.service";
import { GuestComponent } from "../guest/guest.component";
import { PdfService } from "../../services/pdf.service";
import { Algorithm } from "../../entities/algorithm.enum";

@Component({
  selector: 'sidebar-component',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  private _dialogRef: MatDialogRef<GuestComponent>;
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

    this._dialogRef = this._dialog.open(GuestComponent, config);

    this._dialogRef.afterClosed().subscribe(result => {
      this._tableService.redrawLayout();
      this._dialogRef = null;
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

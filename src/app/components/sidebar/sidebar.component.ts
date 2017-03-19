import {Component, ViewContainerRef, ChangeDetectionStrategy} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {TableService} from "../../services/table.service";
import {GuestComponent} from "../guest/guest.component";
import {PdfService} from "../../services/pdf.service";

@Component({
  selector: 'sidebar-component',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  private _dialogRef: MdDialogRef<GuestComponent>;
  private _dialog: MdDialog;
  private _viewContainerRef: ViewContainerRef;
  private _tableService: TableService;
  private _pdfService: PdfService;

  constructor(tableService: TableService, pdfService: PdfService, dialog: MdDialog) {
    this._pdfService = pdfService;
    this._tableService = tableService;
    this._dialog = dialog;
  }

  public openGuestsDialog(): void {
    let config = new MdDialogConfig();
    config.viewContainerRef = this._viewContainerRef;

    this._dialogRef = this._dialog.open(GuestComponent, config);

    this._dialogRef.afterClosed().subscribe(result => {
      this._dialogRef = null;
    });
  }

  public enableSameGuestsOption(): boolean {
    if (this._tableService.guests.length > this._tableService.tableCount) {
      let guestsPerTable: number = Math.ceil(this._tableService.guests.length / this._tableService.tableCount);
      if (guestsPerTable > this._tableService.tableCount) {
        if (this._tableService.neverSameGuests == true)
          this._tableService.neverSameGuests = false;
        return false;
      }
    }
    return true;
  }

  public enableSameTableOption(): boolean {
    if (this._tableService.courseCount <= this._tableService.tableCount) {
      return true;
    } else {
      if (this._tableService.neverSameTable == true)
        this._tableService.neverSameTable = false;
      return false;
    }
  }

  get tableService(): TableService {
    return this._tableService;
  }

  get pdfService(): PdfService {
    return this._pdfService;
  }
}

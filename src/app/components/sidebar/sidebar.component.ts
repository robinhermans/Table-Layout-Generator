import {Component, ViewContainerRef, ChangeDetectionStrategy} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {TableService} from "../../services/table.service";
import {GuestComponent} from "../guest/guest.component";

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

  constructor(tableService: TableService, dialog: MdDialog) {
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

  public enableSameGuestOption(): boolean {
    if (this._tableService.guests.length > this._tableService.tableCount) {
      let guestsPerTable: number = Math.ceil(this._tableService.guests.length / this._tableService.tableCount);
      if(guestsPerTable > this._tableService.tableCount){
        return false;
      }
    }
    return true;
  }

  public enableSameTableOption(): boolean {
    return this._tableService.courseCount <= this._tableService.tableCount;
  }

  get tableService(): TableService {
    return this._tableService;
  }

  set tableService(value: TableService) {
    this._tableService = value;
  }
}

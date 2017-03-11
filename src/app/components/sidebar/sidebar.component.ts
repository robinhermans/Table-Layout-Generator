import {Component, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {TableService} from "../../services/table.service";
import {GuestComponent} from "../guest/guest.component";

@Component({
  selector: 'sidebar-component',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  private _dialogRef: MdDialogRef<GuestComponent>;
  private _dialog: MdDialog;
  private _viewContainerRef: ViewContainerRef;
  private _tableService: TableService;

  constructor(tableService: TableService, dialog: MdDialog, viewContainerRef: ViewContainerRef) {
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

  get tableService(): TableService {
    return this._tableService;
  }

  set tableService(value: TableService) {
    this._tableService = value;
  }
}

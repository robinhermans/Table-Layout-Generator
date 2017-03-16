import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {TableService} from "../../services/table.service";
import {Guest} from "../../entities/guest.entity";

@Component({
  selector: 'guest-component',
  styleUrls: ['./guest.component.css'],
  templateUrl: './guest.component.html',
})
export class GuestComponent {

  private _dialogReference: MdDialogRef<GuestComponent>;
  private _tableService: TableService;

  private _guestModel: Guest;

  constructor(dialogReference: MdDialogRef<GuestComponent>, tableService: TableService) {
    this._dialogReference = dialogReference;
    this._tableService = tableService;
    this._guestModel = {id: null, name: null, eatsMeat: true, eatsFish: true} as Guest;
  }

  public addGuest(): void {
    let id: number = this._tableService.guests.length;
    this._guestModel.id = id;
    this._tableService.addGuest(this._guestModel);
    this._guestModel = {id: null, name: null, eatsMeat: true, eatsFish: true} as Guest;
  }

  public removeGuest(id: number): void {
    for (var i = 0; i < this._tableService.guests.length; i++) {
      let guest: Guest = this._tableService.guests[i];
      if (guest.id == id) {
        this._tableService.removeGuest(i);
      }
    }
  }

  public close(): void {
    this._dialogReference.close(null);
  }

  get tableService(): TableService {
    return this._tableService;
  }

  set tableService(value: TableService) {
    this._tableService = value;
  }

  get guestModel(): Guest {
    return this._guestModel;
  }

  set guestModel(value: Guest) {
    this._guestModel = value;
  }
}

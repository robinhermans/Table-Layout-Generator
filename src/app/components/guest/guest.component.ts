import {Component, ViewChild, ElementRef} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {TableService} from "../../services/table.service";
import {Guest} from "../../entities/guest.entity";

@Component({
  selector: 'guest-component',
  styleUrls: ['./guest.component.css'],
  templateUrl: './guest.component.html',
})
export class GuestComponent {

  @ViewChild("file")
  private _fileInput: ElementRef;

  private _dialogReference: MdDialogRef<GuestComponent>;
  private _tableService: TableService;
  private _guestModel: Guest;

  constructor(dialogReference: MdDialogRef<GuestComponent>, tableService: TableService) {
    this._dialogReference = dialogReference;
    this._tableService = tableService;
    this._guestModel = {id: null, name: null, eatsMeat: true, eatsFish: true} as Guest;
  }

  public addGuest(): void {
    if(!this._guestModel.name || this._guestModel.name == "")
      return;

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

  public openFileDialog(): void {
    this._fileInput.nativeElement.click();
  }

  public import(event): void {
    let self = this;
    let file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      if(!reader.error) {
        let guests: Array<Guest> = JSON.parse(reader.result) as Array<Guest>;
        self._tableService.guests = guests;
      }
    }

    reader.readAsText(file);
  }

  public export(): void {
    var fileContents = JSON.stringify(this._tableService.guests);
    var filename = "table_layout_export.json";
    var filetype = "application/json";

    var a = document.createElement("a");
    a.href = "data:" + filetype + ";base64," + btoa(fileContents);
    a['download'] = filename;
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, false, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
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

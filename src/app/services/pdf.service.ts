import {TableService} from "./table.service";
import {Injectable} from '@angular/core';

declare let jsPDF;

@Injectable()
export class PdfService {

  private _tableService: TableService;

  constructor(tableService: TableService) {
    this._tableService = tableService;
  }

  // WORK IN PROGRESS
  public generatePdf() : void{
    var doc = new jsPDF();

    doc.addFont("Roboto", "Roboto", "Normal");
    doc.setFont("Roboto", "normal");

    doc.setFontSize(24);
    doc.text('Table Layout', 10, 10);

    doc.save('table-layout.pdf')
  }

}

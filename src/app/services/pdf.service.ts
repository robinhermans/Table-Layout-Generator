import {TableService} from "./table.service";
import {Injectable} from '@angular/core';
import {Course} from "../entities/course.entity";
import {Table} from "../entities/table.entity";
import {Guest} from "../entities/guest.entity";

declare let jsPDF;

@Injectable()
export class PdfService {

  private _tableService: TableService;

  constructor(tableService: TableService) {
    this._tableService = tableService;
  }

  // WORK IN PROGRESS. NEEDS A CLEANUP
  public generatePdf(): void {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFontStyle("italic");
    doc.text('Table Layout', 10, 10);

    let y = 20;

    for (let c = 0; c < this._tableService.courses.length; c++) {
      let course: Course = this._tableService.courses[c];
      doc.setFontSize(11);
      doc.text('Course ' + (c + 1), 10, y);
      y += 7;

      let x = 10;
      for (let t = 0; t < course.tables.length; t++) {
        let originalY = y;

        let table: Table = course.tables[t];
        doc.setFontSize(11);
        doc.text('Table ' + (t + 1), x, y);
        y += 5;

        doc.setFontStyle("normal");
        for (let g = 0; g < table.chairs.length; g++) {
          let guest: Guest = table.chairs[g].guest;
          doc.setFontSize(8);
          doc.text(guest.name, x, y);
          y += 3;
        }
        if (x > 150) {
          y += 4;
          x = 10;
        } else {
          if (t < course.tables.length - 1)
            y = originalY;
          x += 50;
        }
        doc.setFontStyle("italic");
      }
      y += 7;

      if((c+1) % 3 == 0 && (c < this._tableService.courses.length - 1)) {
        doc.addPage();
        x = 10;
        y = 20;
      }
    }

    doc.save('table-layout.pdf')
  }

}

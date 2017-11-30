import { TableService } from "./table.service";
import { Injectable } from '@angular/core';
import { Course } from "../entities/course.entity";
import { Table } from "../entities/table.entity";
import { Guest } from "../entities/guest.entity";
import { Position } from "../entities/position.enum";

declare let jsPDF;

@Injectable()
export class PdfService {

  private _tableService: TableService;
  private _borderImage: any;

  constructor(tableService: TableService) {
    this._tableService = tableService;
  }

  // WORK IN PROGRESS. NEEDS A CLEANUP
  public generatePdf(tablePrefix: String, cardBackground: ImageData, backgroundPosition: Position): void {
    var doc = new jsPDF();
    doc.addFont('AmaticSC-Bold.ttf', 'Amatic SC', 'bold');
    doc.setFont('Amatic SC', 'bold');

    let layout: Map<number, Array<Map<number, Guest>>> = this.generateTableLayout();

    let self = this;

    this._borderImage = new Image();
    this._borderImage.onload = function () {
      self.generateAndSave(doc, layout, tablePrefix, cardBackground, backgroundPosition);
    }
    this._borderImage.src = "assets/images/border.png"
  }

  private generateAndSave(doc: any, layout: Map<number, Array<Map<number, Guest>>>, tablePrefix: String, cardBackground: ImageData, backgroundPosition: Position) {
    let nameFontSize = 18;
    let tableFontSize = 14;

    let namesPerCard = this._tableService.courseCount;
    let cardHeight = 15 + (namesPerCard * ((nameFontSize) / 2));
    let cardWidth = 100;

    let x = 5;
    let y = 5;
    for (let t = 0; t < layout.size; t++) {
      let cards: Array<Map<number, Guest>> = layout.get(t);
      for (let c = 0; c < cards.length; c++) {
        let guests: Map<number, Guest> = cards[c];

        // START DRAW
        doc.rect(x, y, cardWidth, cardHeight);

        let borderWidth = cardWidth * 0.85;
        let borderHeight = borderWidth * (this._borderImage.height / this._borderImage.width);
        doc.addImage(this._borderImage, 'PNG', x + ((cardWidth / 2) - (borderWidth / 2)), y + (cardHeight - (borderHeight + 2)), borderWidth, borderHeight);

        doc.setFontSize(nameFontSize);
        let cX = x + (cardWidth / 2);
        let cY = y + (nameFontSize / 2);

        for (let g = 0; g < guests.size; g++) {
          let guest: Guest = guests.get(g);
          if (!guest.eatsFish && !guest.eatsMeat) {
            doc.setTextColor(161, 193, 118);
          } else if (!guest.eatsFish) {
            doc.setTextColor(135, 185, 242);
          } else if (!guest.eatsMeat) {
            doc.setTextColor(242, 127, 123);
          } else {
            doc.setTextColor(0, 0, 0);
          }
          doc.text(guest.name, cX, cY, null, null, 'center');
          cY += (nameFontSize / 2);
        }

        // DRAW THE BACKGROUND
        if (cardBackground) {
          let imgData = cardBackground['src'];

          let w, h = 0;
          if (cardBackground.width >= cardBackground.height) {
            let aspectRatio = cardBackground.height / cardBackground.width;
            w = cardWidth * 0.15;
            h = w * aspectRatio;
          } else {
            let aspectRatio = cardBackground.width / cardBackground.height;
            h = cardHeight * 0.15;
            w = h * aspectRatio;
          }

          switch (backgroundPosition) {
            case Position.TOP_LEFT:
              doc.addImage(imgData, 'JPEG', x + 5, y + 5, w, h);
              break;
            case Position.TOP_RIGHT:
              doc.addImage(imgData, 'JPEG', (x + cardWidth) - (w + 5), y + 5, w, h);
              break;
            case Position.BOTTOM_LEFT:
              doc.addImage(imgData, 'JPEG', x + 12.5, (y + cardHeight) - (h + borderHeight), w, h);
              break;
            case Position.BOTTOM_RIGHT:
              doc.addImage(imgData, 'JPEG', (x + cardWidth) - (w + 12.5), (y + cardHeight) - (h + borderHeight), w, h);
              break;
          }
        }

        // DRAW THE TABLE TEXT
        doc.setFontSize(tableFontSize);
        doc.setTextColor(0, 0, 0);
        if (cardBackground && backgroundPosition === Position.BOTTOM_LEFT) {
          doc.text(tablePrefix + ' ' + (t + 1), x + (cardWidth * 0.75), y + (cardHeight - borderHeight), null, null, 'center');
        } else {
          doc.text(tablePrefix + ' ' + (t + 1), x + (cardWidth * 0.25), y + (cardHeight - borderHeight), null, null, 'center');
        }

        // END DRAW

        if (x - cardWidth > 0) {
          y += cardHeight;
          x = 5;
        } else {
          x += cardWidth;
        }

        if ((y + cardHeight) > 297 && ((c + 1 < cards.length) || (t + 1 < layout.size))) {
          doc.addPage();
          x = 5;
          y = 5;
        }
      }
    }

    doc.save('table-cards.pdf');
  }

  private generateTableLayout(): Map<number, Array<Map<number, Guest>>> {
    let layout: Map<number, Array<Map<number, Guest>>> = new Map();

    for (let c = 0; c < this._tableService.courses.length; c++) {
      let course: Course = this._tableService.courses[c];
      for (let t = 0; t < course.tables.length; t++) {
        let table: Table = course.tables[t];
        let cards: Array<Map<number, Guest>> = layout.get(table.id);
        if (!cards) {
          cards = new Array();
        }

        for (let g = 0; g < table.chairs.length; g++) {
          let card: Map<number, Guest> = cards[g];
          if (!card) {
            card = new Map();
          }

          card.set(c, table.chairs[g].guest);
          cards[g] = card;
        }
        layout.set(table.id, cards);
      }
    }

    return layout;
  }

}

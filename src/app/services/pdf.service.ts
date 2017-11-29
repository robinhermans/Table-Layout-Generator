import {TableService} from "./table.service";
import {Injectable} from '@angular/core';
import {Course} from "../entities/course.entity";
import {Table} from "../entities/table.entity";
import {Guest} from "../entities/guest.entity";
import {Position} from "../entities/position.enum"

declare let jsPDF;

@Injectable()
export class PdfService {

  private _tableService: TableService;

  constructor(tableService: TableService) {
    this._tableService = tableService;
  }

  // WORK IN PROGRESS. NEEDS A CLEANUP
  public generatePdf(tabblePrefix: String, cardBackground: any, backgroundPosition: Position): void {
    var doc = new jsPDF();
    doc.addFont('AmaticSC-Bold.ttf', 'Amatic SC', 'bold');
    doc.setFont('Amatic SC', 'bold');
    
    let layout: Map<number, Array<Map<number, Guest>>> = this.generateTableLayout();

    let nameFontSize = 24;
    let tableFontSize = 18;

    let namesPerCard = this._tableService.courseCount;
    let cardSize = namesPerCard * (nameFontSize + (nameFontSize/2)) + 100;

    doc.save('table-cards.pdf')
  }

  private generateTableLayout(): Map<number, Array<Map<number, Guest>>> {
    let layout: Map<number, Array<Map<number, Guest>>> = new Map();

    for(let c = 0; c < this._tableService.courses.length; c++){
      let course: Course = this._tableService.courses[c];
      for(let t = 0; t < course.tables.length; t++){
        let table: Table = course.tables[t];
        let cards: Array<Map<number, Guest>> = layout.get(table.id);
        if(!cards){
          cards = new Array();
        }      

        for(let g = 0; g < table.chairs.length; g++){
          let card: Map<number, Guest> = cards[g];
          if(!card){
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

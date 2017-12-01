import 'hammerjs';
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatDialogModule, MatSliderModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule} from "@angular/material";
import {CanvasComponent} from "./components/canvas/canvas.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TableService} from "./services/table.service";
import {GuestComponent} from "./components/guest/guest.component";
import {ReversePipe} from "./pipes/reverse.pipe";
import {GeneratorComponent} from "./components/generator/generator.component";
import {PdfService} from "./services/pdf.service";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    SidebarComponent,
    GuestComponent,
    GeneratorComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  entryComponents: [
    GuestComponent,
    GeneratorComponent
  ],
  providers: [
    TableService,
    PdfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

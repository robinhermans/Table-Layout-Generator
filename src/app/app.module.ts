import 'hammerjs';
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {MaterialModule} from "../../node_modules/@angular/material/module";
import {CanvasComponent} from "./components/canvas/canvas.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TableService} from "./services/table.service";
import {GuestComponent} from "./components/guest/guest.component";
import {ReversePipe} from "./pipes/ReversePipe";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    SidebarComponent,
    GuestComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  entryComponents: [
    GuestComponent
  ],
  providers: [
    TableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

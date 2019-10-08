import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import {
  AppComponent,
  RootRoutingModule,
  AComponent,
  BComponent,
  CComponent,
  serviceName
} from "./app.component";

@NgModule({
  imports: [BrowserModule, RootRoutingModule],
  declarations: [AppComponent, AComponent, BComponent, CComponent],
  providers: [serviceName],
  bootstrap: [AppComponent]
})
export class AppModule {}

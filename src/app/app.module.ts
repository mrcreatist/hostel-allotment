import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { component } from './component/component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { module } from './module/module';
import { service } from './service/service';

@NgModule({
  declarations: [
    AppComponent,
    ...component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...module
  ],
  providers: [
    ...service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

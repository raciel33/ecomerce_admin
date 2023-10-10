import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';

import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    routing



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

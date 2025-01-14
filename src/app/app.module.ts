import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';

import { routing } from './app.routing';
import { NgxTinymceModule } from 'ngx-tinymce';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NgxChartsModule } from '@swimlane/ngx-charts';




@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    routing,
    RouterModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../../assets/tinymce/',

    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import {DataTablesModule} from 'angular-datatables';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { CompareComponent } from './compare/compare.component';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { NgSearchFilterModule } from 'ng-search-filter';
import { ThmComponent } from './thm/thm.component';


const PROXY_SERVER= 'http://ncerndobedev6519.etv.nce.amadeus.net:57509/1ASIREV/DIYGUI';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CompareComponent,
    ThmComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgSearchFilterModule,
    FormsModule
    ],
  providers: [
    {provide: APP_BASE_HREF, useValue:'/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

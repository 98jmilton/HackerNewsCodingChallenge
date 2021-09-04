import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlelistComponent } from './article-list/article-list.component';
import { HeaderComponent } from './header/header.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatSelectModule } from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ArticlelistComponent, HeaderComponent],
  imports: [BrowserAnimationsModule, BrowserModule, HttpClientModule, MatSelectModule, RouterModule.forRoot([])],
  exports: [MatSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

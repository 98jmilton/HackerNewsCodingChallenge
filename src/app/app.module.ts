import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlelistComponent } from './article-list/article-list.component';
import { HeaderComponent } from './header/header.component';

import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ArticlelistComponent, HeaderComponent],
  imports: [A11yModule, BrowserAnimationsModule, BrowserModule, HttpClientModule,
            MatPaginatorModule, MatSelectModule, MatProgressSpinnerModule,RouterModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/Articles', pathMatch: 'full'},
      {path: 'Articles', component: ArticlelistComponent},
      {path: 'Ask', component: ArticlelistComponent},
      {path: 'Show', component: ArticlelistComponent},
      {path: 'Jobs', component: ArticlelistComponent}
    ])],
  exports: [MatSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

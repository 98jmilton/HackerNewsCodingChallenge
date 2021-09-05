import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlelistComponent } from './article-list.component';
import { RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule} from "@angular/common/http/testing";
import { PageEvent} from "@angular/material/paginator";

describe('ArticlelistComponent', () => {
  let component: ArticlelistComponent;
  let fixture: ComponentFixture<ArticlelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ArticlelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {expect(component).toBeTruthy();});

  it("should download list of articles", () => {expect(component.articleAmount).toBeGreaterThan(0);});

  it("should have articles that are not null", () => {expect(component.articles).toBeTruthy();});

  it("should use convertDate() correctly", () =>{expect(component.convertDate(1630861761)).toEqual("05/09/2021, 18:09:21");});

  it("should have a changable number of articles per page", () =>{
    var pageEvent = new PageEvent();
    pageEvent.pageSize = 30
    component.updatePaginator(pageEvent);
    expect(component.articleAmount).toEqual(30);
    pageEvent.pageSize = 50
    component.updatePaginator(pageEvent);
    expect(component.articleAmount).toEqual(50);
  });

  it("should have a changable page number with the correct number of articles", () =>{
    var pageEvent = new PageEvent();
    pageEvent.pageSize = 30;
    pageEvent.pageIndex = 1;
    component.updatePaginator(pageEvent);
    expect(component.currentPage).toEqual(1);

    pageEvent.pageIndex = 2;
    component.updatePaginator(pageEvent);
    expect(component.currentPage).toEqual(2);
  });

  it("updateArticle list should set current page back to 0, and selected sort by type to user selected", () =>{
    component.updateArticleOrder("beststories.json")
    expect(component.selected).toEqual("beststories.json");
    expect(component.currentPage).toEqual(0);

    component.updateArticleOrder("topstories.json")
    expect(component.selected).toEqual("topstories.json");
    expect(component.currentPage).toEqual(0);

    component.updateArticleOrder("newstories.json")
    expect(component.selected).toEqual("newstories.json");
    expect(component.currentPage).toEqual(0);
  });
});

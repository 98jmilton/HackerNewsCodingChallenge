import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlelistComponent } from './article-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ArticlelistComponent', () => {
  let component: ArticlelistComponent;
  let fixture: ComponentFixture<ArticlelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should download list of articles", () => {
    expect(component.articleAmount).toBeGreaterThan(0);
  });

  it("should have articles that are not null", () => {
    expect(component.articles).toBeTruthy();
  });


});

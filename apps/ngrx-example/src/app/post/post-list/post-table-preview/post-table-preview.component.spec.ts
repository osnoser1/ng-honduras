import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTablePreviewComponent } from './post-table-preview.component';

describe('PostTablePreviewComponent', () => {
  let component: PostTablePreviewComponent;
  let fixture: ComponentFixture<PostTablePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTablePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

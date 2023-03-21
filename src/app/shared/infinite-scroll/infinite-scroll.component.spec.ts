import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { InfiniteScrollTargetDirective } from '@shared/infinite-scroll/infinite-scroll-target.directive';

import { Photo } from '@shared/photos/photos.model';

@Component({
  template: `<app-infinite-scroll [loading]="loading" (scrolled)="addToFavorites()">
    <img
      *ngFor="let photo of photos"
      [src]="photo.download_url"
      [alt]="photo.author"
      [width]="photo.width"
      [height]="photo.height"
    />
  </app-infinite-scroll>`,
})
class TestWrapComponent {
  @ViewChild(InfiniteScrollComponent, { static: true }) infiniteScrollComponent!: InfiniteScrollComponent;

  photos: Photo[] = Array.from({ length: 9 }, (_, i) => ({
    id: `id-${i}`,
    author: `author-${i}`,
    width: 300,
    height: 300,
    download_url: `url-${i}`,
    url: `url-${i}`,
  }));
  loading = false;

  addToFavorites = jasmine.createSpy();
}

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let testWrapComponent: TestWrapComponent;
  let fixture: ComponentFixture<TestWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWrapComponent, InfiniteScrollComponent, InfiniteScrollTargetDirective],
      imports: [MatGridListModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapComponent);
    testWrapComponent = fixture.componentInstance;
    component = testWrapComponent.infiniteScrollComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit scroll event', (done) => {
    const emitSpy = spyOn(component.scrolled, 'emit');

    component.target.elementRef.nativeElement.scrollIntoView();

    setTimeout(() => {
      expect(emitSpy).toHaveBeenCalled();
      done();
    }, 1000);
  });
});

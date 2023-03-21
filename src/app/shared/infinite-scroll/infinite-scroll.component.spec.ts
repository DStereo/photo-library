import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { InfiniteScrollComponent } from './infinite-scroll.component';

@Component({
  template: '<app-infinite-scroll [loading]="loading"></app-infinite-scroll>',
})
class TestWrapComponent {
  @ViewChild(InfiniteScrollComponent, { static: true }) infiniteScrollComponent!: InfiniteScrollComponent;

  loading = false;
}

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let testWrapComponent: TestWrapComponent;
  let fixture: ComponentFixture<TestWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWrapComponent, InfiniteScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapComponent);
    testWrapComponent = fixture.componentInstance;
    component = testWrapComponent.infiniteScrollComponent;
  });

  beforeEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});

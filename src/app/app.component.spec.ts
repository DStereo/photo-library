import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WINDOW, WINDOW_PROVIDER } from '@core/window/window.token';

import { HeaderModule } from '@core/header/header.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let windowInstance: Window;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, HeaderModule],
      providers: [WINDOW_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    windowInstance = TestBed.inject(WINDOW);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Window', () => {
    it('should set window', () => {
      expect(windowInstance).toEqual(window);
    });
  });
});

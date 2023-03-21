import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { InfiniteScrollTargetDirective } from './infinite-scroll-target.directive';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @ViewChild(InfiniteScrollTargetDirective, { static: true }) target!: InfiniteScrollTargetDirective;

  @Input() options: IntersectionObserverInit = {};
  @Input() loading = true;
  @Output() scrolled = new EventEmitter<void>();

  private defaultOptions: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 1.0 };
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initObserver(): void {
    const target = this.target.elementRef.nativeElement;
    const options: IntersectionObserverInit = {
      ...this.defaultOptions,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);

    this.observer.observe(target);
  }
}

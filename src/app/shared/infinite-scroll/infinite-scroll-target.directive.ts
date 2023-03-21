import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrollTarget]',
})
export class InfiniteScrollTargetDirective {
  constructor(public elementRef: ElementRef) {}
}

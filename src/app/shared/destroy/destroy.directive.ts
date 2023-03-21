import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: '[appDestroy]',
})
export class DestroyDirective implements OnDestroy {
  destroy$: Observable<void>;

  private destroySource = new Subject<void>();

  constructor() {
    this.destroy$ = this.destroySource.asObservable();
  }

  ngOnDestroy(): void {
    this.destroySource.next();
    this.destroySource.complete();
  }
}

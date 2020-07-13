import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrollingFinished = new EventEmitter<void>();

  emitted = false;

  @HostListener("window:scroll", [])
  onScroll(): void {
    // console.log(window.innerHeight+" "+window.scrollY+">="+document.body.scrollHeight+" " +this.emitted);
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 600 && !this.emitted) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if ((window.innerHeight + window.scrollY) < document.body.scrollHeight - 600) {
      this.emitted = false;
    }
  }
}
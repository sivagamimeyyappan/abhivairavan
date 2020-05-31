import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  showFilterIcon: boolean = false;
  showSidepanel: boolean = false;
  isAdmin: boolean = true;
  customerId: string = "101";

  private filterIcon = new BehaviorSubject<boolean>(this.showFilterIcon);
  public observeFilterIcon = this.filterIcon.asObservable();

  private sidePanel = new BehaviorSubject<boolean>(this.showSidepanel);
  public observeSidepanel = this.sidePanel.asObservable();

  constructor() { }

  setShowFilterIcon(value: boolean) {
    this.showFilterIcon = value;
    this.filterIcon.next(value);
  }

  setShowSidepanel(value: boolean) {
    this.showSidepanel = value;
    this.sidePanel.next(value);
  }
  
  getDateObject(date){
    return new Date(JSON.parse(date))
  }

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  };
}

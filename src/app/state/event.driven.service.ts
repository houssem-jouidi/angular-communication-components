import { ActionEvent } from 'src/app/state/product.state';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EventDrivenService {
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();
  constructor(){}
publishEvent(event: ActionEvent): void {
this.sourceEventSubject.next(event);
}
}

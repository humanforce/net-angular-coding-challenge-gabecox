import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CurrentSprintService {
    private sprintIdSubject: BehaviorSubject<number> =
        new BehaviorSubject<number>(10);

    getSprintId(): Observable<number> {
        return this.sprintIdSubject.asObservable();
    }

    setSprintId(sprintId: number): void {
        this.sprintIdSubject.next(sprintId);
    }
}

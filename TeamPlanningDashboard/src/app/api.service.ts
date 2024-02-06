import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:5187';

    constructor(private http: HttpClient) {}

    getVelocity(sprintId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/velocity?sprintId=${sprintId}`);
    }
    getTickets(sprintId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/tickets?sprintId=${sprintId}`);
    }
    getSprint(sprintId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/sprint?sprintId=${sprintId}`);
    }
    getCalendar(country: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/calendar?country=${country}`);
    }
}

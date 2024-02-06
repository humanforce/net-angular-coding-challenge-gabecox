import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { components } from '../types/schema';
import { CurrentSprintService } from '../current-sprint.service';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
    public tickets: components['schemas']['TicketModel'][] = [];

    constructor(
        private apiService: ApiService,
        private currentSprintService: CurrentSprintService
    ) {}

    ngOnInit(): void {
        this.currentSprintService
            .getSprintId()
            .subscribe((sprintId: number) => {
                this.apiService
                    .getTickets(sprintId)
                    .subscribe(
                        (data: components['schemas']['TicketModel'][]) => {
                            console.log(data);
                            this.tickets = data;
                        }
                    );
            });
    }
}

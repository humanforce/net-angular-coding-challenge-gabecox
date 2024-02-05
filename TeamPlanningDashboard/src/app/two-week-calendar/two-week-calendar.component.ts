import { Component, Injectable, OnInit } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { addDays, subDays, subHours } from 'date-fns';
import { ApiService } from '../api.service';
import { CurrentSprintService } from '../current-sprint.service';
import { components } from '../types/schema';
import { GetMonthViewArgs, MonthView } from 'calendar-utils';

@Injectable()
export class MyCalendarUtils extends CalendarUtils {
    override getMonthView(args: GetMonthViewArgs): MonthView {
        args.viewStart = args.viewDate;
        args.viewEnd = addDays(args.viewStart, 13);
        return super.getMonthView(args);
    }
}
@Component({
    selector: 'app-two-week-calendar',
    templateUrl: './two-week-calendar.component.html',
    styleUrls: ['./two-week-calendar.component.scss'],
    providers: [
        {
            provide: CalendarUtils,
            useClass: MyCalendarUtils,
        },
    ],
})
export class TwoWeekCalendarComponent implements OnInit {
    viewDate: Date = new Date();
    endDate: Date = addDays(new Date(), 14);

    events: CalendarEvent[] = [];
    public currentSprint: number = 0;

    constructor(
        private apiService: ApiService,
        private currentSprintService: CurrentSprintService
    ) {}

    displaySprint(sprint: components['schemas']['SprintModel']) {
        this.viewDate = subDays(new Date(sprint.startDate ?? ''), 1);
        this.endDate = subDays(new Date(sprint.endDate ?? ''), 2);

        if (this.events.length > 0) {
            this.events[0] = {
                title: `${sprint.name}`,
                start: this.viewDate,
                end: this.endDate,
                color: {
                    primary: 'tomato',
                    secondary: 'tomato',
                },
            };
        } else {
            this.events.push({
                title: `${sprint.name}`,
                start: this.viewDate,
                end: this.endDate,
                color: {
                    primary: 'tomato',
                    secondary: 'tomato',
                },
            });
        }
    }

    ngOnInit(): void {
        this.apiService
            .getCalendar('all')
            .subscribe(
                (
                    calendarEvents: components['schemas']['CalendarEventModel'][]
                ) => {
                    calendarEvents.forEach((e) => {
                        this.events.push({
                            title: `${e.summary} - ${e.country}`,
                            start: new Date(e.start?.date ?? ''),
                            color: {
                                primary: 'blue',
                                secondary: 'yellow',
                            },
                        });
                    });
                }
            );
        this.currentSprintService
            .getSprintId()
            .subscribe((sprintId: number) => {
                this.currentSprint = sprintId;
                this.apiService
                    .getSprint(sprintId)
                    .subscribe((data: components['schemas']['SprintModel']) => {
                        this.displaySprint(data);
                    });

                this.currentSprint = sprintId;
            });
    }
}

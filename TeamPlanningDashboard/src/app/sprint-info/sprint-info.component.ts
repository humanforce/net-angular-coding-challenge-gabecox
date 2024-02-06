import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../api.service';
import { components } from '../types/schema';
import { CurrentSprintService } from '../current-sprint.service';

@Component({
    selector: 'app-sprint-info',
    templateUrl: './sprint-info.component.html',
    styleUrls: ['./sprint-info.component.scss'],
})
export class SprintInfoComponent implements OnInit {
    public currentSprint: number = 0;
    public sprintInfo: components['schemas']['SprintModel'] = {};
    public chart: any;
    public velocityData$: any;
    constructor(
        private apiService: ApiService,
        private currentSprintService: CurrentSprintService,
        private cdr: ChangeDetectorRef
    ) {}

    createChart(data: components['schemas']['SprintVelocityModel'][]) {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart('VelocityChart', {
            type: 'line',
            data: {
                labels: data.map((item) => item.sprintId),
                datasets: [
                    {
                        label: 'Velocity',
                        data: data.map((item) => item.velocity),
                        backgroundColor: 'blue',
                    },
                ],
            },
            options: {
                aspectRatio: 3,
            },
        });
    }

    navigateSprint(offset: number): void {
        this.currentSprint += offset;
        this.currentSprint = this.currentSprint == 0 ? 1 : this.currentSprint;
        this.currentSprint = this.currentSprint == 11 ? 10 : this.currentSprint;
        this.currentSprintService.setSprintId(this.currentSprint);
    }

    ngOnInit(): void {
        this.currentSprintService
            .getSprintId()
            .subscribe((sprintId: number) => {
                this.currentSprint = sprintId;
                this.apiService.getSprint(sprintId).subscribe((data: any) => {
                    this.sprintInfo = data;
                    this.sprintInfo.capacity = Math.round(data.capacity);
                });
                this.apiService
                    .getVelocity(sprintId)
                    .subscribe((data: any[]) => {
                        this.createChart(data);
                        this.cdr.detectChanges();
                    });
            });
    }
    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}

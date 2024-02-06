import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MainComponent } from './main/main.component';
import { TwoWeekCalendarComponent } from './two-week-calendar/two-week-calendar.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SprintInfoComponent } from './sprint-info/sprint-info.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        TwoWeekCalendarComponent,
        TicketsComponent,
        SprintInfoComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    providers: [importProvidersFrom(HttpClientModule)],
    bootstrap: [AppComponent],
})
export class AppModule {}

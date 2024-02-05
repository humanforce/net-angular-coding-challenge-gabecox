using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using TeamPlanningApi.Models.Calendar;

namespace TeamPlanningApi.Services
{
    public class SprintService
    {
        private readonly CalendarService _calendarService;

        public SprintService(CalendarService calendarService)
        {
            _calendarService = calendarService;
        }
        
        public double GetCapacity(DateTime startDate, DateTime endDate)
        {
            List<CalendarEventModel> calendarEvents = new List<CalendarEventModel>();
            int workdays = 10;
            double hours = 7.6;
            calendarEvents = _calendarService.GetAllCalendars();
            int events = calendarEvents
                .Where(e => IsWeekday(e.Start.Date) && IsWithinTimeframe(e.Start.Date, startDate, endDate))
                .GroupBy(e => new { e.Start.Date, e.Country })
                .Count();


            return (workdays - events) * hours * 3;
            // return events * 1.0; 
        }

        private bool IsWeekday(string date)
        {
            DateTime eventDate = DateTime.Parse(date);
            return eventDate.DayOfWeek != DayOfWeek.Saturday && eventDate.DayOfWeek != DayOfWeek.Sunday;
        }

        private bool IsWithinTimeframe(string eventDate, DateTime startDate, DateTime endDate)
        {
            DateTime actualEventDate = DateTime.Parse(eventDate);
            return actualEventDate >= startDate && actualEventDate <= endDate;
        }
    }
}
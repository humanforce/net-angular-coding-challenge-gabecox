using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using TeamPlanningApi.Models.ApiResponses;
using TeamPlanningApi.Models.Calendar;

namespace TeamPlanningApi.Services
{
    public class CalendarService
    {
        public  GoogleCalendarResponseModel GetCalendar(string country)
        {
            string filePath = Path.Combine("..", "Data", "GoogleCalendarAPI", $"{country.ToLower()}.json");
            string jsonData = System.IO.File.ReadAllText(filePath);
            var calendarResponse = JsonConvert.DeserializeObject<GoogleCalendarResponseModel>(jsonData);
            if (calendarResponse.Items != null)
            {
                foreach (var item in calendarResponse.Items)
                {
                    item.Country = country;
                }
            }

            return calendarResponse;
        }

        public  List<CalendarEventModel> GetAllCalendars()
        {
            List<CalendarEventModel> calendarEvents = new List<CalendarEventModel>();

            var countries = new[] { "australian", "pakistan", "philippines" };

            foreach (var countryName in countries)
            {
                var countryApiResponse = GetCalendar(countryName);
                if (countryApiResponse.Items != null)
                {
                    calendarEvents.AddRange(countryApiResponse.Items);
                }
            }

            return calendarEvents;
        }
    }
}
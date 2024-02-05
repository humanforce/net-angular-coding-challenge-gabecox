namespace TeamPlanningApi.Models.Calendar
{
    public class CalendarEventModel
    {
        public string Id { get; set; }
        public string Summary { get; set; }
        public EventDate Start { get; set; }
        public EventDate End { get; set; }
        public string Country { get; set; }
    }

    public class EventDate
    {
        public string Date { get; set; }
    }
}
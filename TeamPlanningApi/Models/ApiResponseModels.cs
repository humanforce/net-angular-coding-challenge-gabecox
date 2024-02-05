using TeamPlanningApi.Models.Sprint;
using TeamPlanningApi.Models.Ticket;
using TeamPlanningApi.Models.Calendar;

namespace TeamPlanningApi.Models.ApiResponses
{
    public class JiraSprintResponseModel
    {
        public List<SprintModel> Values { get; set; }
    }
    public class JiraBacklogResponseModel
    {
        public List<TicketModel> Issues { get; set; }
    }

    public class GoogleCalendarResponseModel
    {
        public string Description { get; set; }
        public List<CalendarEventModel> Items { get; set; }
    }
}
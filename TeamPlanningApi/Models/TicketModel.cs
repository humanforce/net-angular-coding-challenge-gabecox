using TeamPlanningApi.Models.Sprint;
using Newtonsoft.Json;

// id
// key
// self
// sprint - customfield_10020
// story points - customfield_10016
namespace TeamPlanningApi.Models.Ticket
{
    public class TicketModel
    {
        public int Id { get; set; }
        public string Key { get; set; }

        public FieldsModel Fields { get; set; }
    }
    public class FieldsModel
    {
        [JsonProperty("customfield_10020")]
        public List<SprintModel> Sprints { get; set; }

        [JsonProperty("customfield_10016")]
        public double StoryPoints { get; set; }
    }
}
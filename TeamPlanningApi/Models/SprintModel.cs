namespace TeamPlanningApi.Models.Sprint
{
    public class SprintModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Capacity {get; set;}
    }
}
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TeamPlanningApi.Models.ApiResponses;
using TeamPlanningApi.Models.Ticket;
using TeamPlanningApi.Models.SprintVelocity;

namespace TeamPlanningApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VelocityController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SprintVelocityModel>))]

    public IActionResult GetVelocity([FromQuery] int sprintId)
    {
        if (sprintId <= 0)
        {
            return BadRequest("sprintId must be greater than 0.");
        }

        string filePath = Path.Combine("..", "Data", "JiraAPI", "backlog.json");
        string jsonData = System.IO.File.ReadAllText(filePath);
        var apiResponse = JsonConvert.DeserializeObject<JiraBacklogResponseModel>(jsonData);
        var allTickets = apiResponse.Issues;
        var targetSprints = allTickets
                .Where(s => s.Fields.Sprints.Any(sprint => sprint.Id == sprintId ||
                                                         sprint.Id == sprintId - 1 ||
                                                         sprint.Id == sprintId - 2))
                .ToList();

        var sprintVelocities = new List<SprintVelocityModel>();
           for (int i = sprintId - 2; i <= sprintId; i++)
            {
                if (i > 0)
                {
                    var sprintData = new SprintVelocityModel
                    {
                        SprintId = i,
                        Velocity = targetSprints
                            .Where(ticket => ticket.Fields?.Sprints?.Any(sprint => sprint?.Id == i) == true)
                            .Sum(ticket => ticket.Fields?.StoryPoints ?? 0)
                    };
                    sprintVelocities.Add(sprintData);
                }
            }

        return Ok(sprintVelocities);

    }
}

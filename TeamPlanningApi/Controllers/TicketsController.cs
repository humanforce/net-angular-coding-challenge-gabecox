using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TeamPlanningApi.Models.ApiResponses;
using TeamPlanningApi.Models.Ticket;

namespace TeamPlanningApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TicketsController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<TicketModel>))]

    public IActionResult GetTickets([FromQuery] int sprintId)
    {
        if (sprintId <= 0)
        {
            return BadRequest("sprintId must be greater than 0.");
        }

        string filePath = Path.Combine("..", "Data", "JiraAPI", "backlog.json");
        string jsonData = System.IO.File.ReadAllText(filePath);
        var apiResponse = JsonConvert.DeserializeObject<JiraBacklogResponseModel>(jsonData);
        var allTickets = apiResponse.Issues;
        var filteredTickets = allTickets.Where(s => s.Fields.Sprints[0].Id == sprintId).ToList();
        return Ok(filteredTickets);
    }
}

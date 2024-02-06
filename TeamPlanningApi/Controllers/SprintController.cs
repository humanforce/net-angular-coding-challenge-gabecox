using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TeamPlanningApi.Models.ApiResponses;
using TeamPlanningApi.Models.Sprint;
using TeamPlanningApi.Models.Calendar;
using TeamPlanningApi.Services;


namespace TeamPlanningApi.Controllers;

[ApiController]
[Route("[controller]")]
public class SprintController : ControllerBase
{
    private readonly SprintService _sprintService;

    public SprintController(SprintService sprintService)
    {
        _sprintService = sprintService;
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SprintModel>))]

    public IActionResult GetSprint([FromQuery] int sprintId)
    {
        if (sprintId <= 0)
        {
            return BadRequest("sprintId must be greater than 0.");
        }

        string filePath = Path.Combine("..", "Data", "JiraAPI", "sprints.json");
        string jsonData = System.IO.File.ReadAllText(filePath);
        var apiResponse = JsonConvert.DeserializeObject<JiraSprintResponseModel>(jsonData);
        var allSprints = apiResponse.Values;
        var filteredSprint = allSprints.Where(s => s.Id == sprintId).ToList()[0];
        filteredSprint.Capacity = _sprintService.GetCapacity(filteredSprint.StartDate, filteredSprint.EndDate);

        return Ok(filteredSprint);
    }

}


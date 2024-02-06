using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TeamPlanningApi.Models.ApiResponses;
using TeamPlanningApi.Models.Calendar;
using System.Collections.Generic;
using TeamPlanningApi.Services;

namespace TeamPlanningApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CalendarController : ControllerBase
{
    private readonly CalendarService _calendarService;

    public CalendarController(CalendarService calendarService)
    {
        _calendarService = calendarService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<CalendarEventModel>))]

    public IActionResult GetCalendars([FromQuery] string country)
    {
        if (string.IsNullOrEmpty(country))
        {
            return BadRequest("Country parameter is required.");
        }

        List<CalendarEventModel> calendarEvents = new List<CalendarEventModel>();

        if (country.ToLower() == "all")
        {
            calendarEvents = _calendarService.GetAllCalendars();
        }
        else
        {
            var apiResponse = _calendarService.GetCalendar(country);
            calendarEvents.AddRange(apiResponse.Items ?? new List<CalendarEventModel>());
        }

        return Ok(calendarEvents);
    }
}

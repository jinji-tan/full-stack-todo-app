using HCrudAPI.Repositories.interfaces;
using HCrudAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HCrudAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todo;
        public TodoController(ITodoRepository todo)
        {
            _todo = todo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodo()
        {
            var response = await _todo.GetAllTask();

            if (response == null)
                return NotFound("Empty List");

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(TodoDto todoDto)
        {
            var response = await _todo.Add(todoDto);

            if (!response)
                return StatusCode(500, "Failed to add task");

            return Ok(new { message = "Task added successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoDto todoDto)
        {
            var response = await _todo.Update(id, todoDto);

            if (!response)
                return StatusCode(500, "Failed to update task");

            return Ok(new { message = "Task updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var response = await _todo.Delete(id);

            if (!response)
                return StatusCode(500, "Failed to delete task");

            return Ok(new { message = "Task deleted successfully" });
        }
    }
}
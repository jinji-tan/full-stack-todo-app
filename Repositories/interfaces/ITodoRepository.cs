using HCrudAPI.DTOs;
using HCrudAPI.Models;

namespace HCrudAPI.Repositories.interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTask();
        Task<Todo?> GetTaskById(int id);
        Task<bool> Add(TodoDto todoDto);
        Task<bool> Update(int id, TodoDto todoDto);
        Task<bool> Delete(int id);
    }
}
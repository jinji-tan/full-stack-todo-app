using Dapper;
using HCrudAPI.Data;
using HCrudAPI.DTOs;
using HCrudAPI.Models;
using HCrudAPI.Repositories.interfaces;

namespace HCrudAPI.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DapperContext _dapper;
        public TodoRepository(DapperContext context)
        {
            _dapper = context;
        }
        public async Task<IEnumerable<Todo>> GetAllTask()
        {
            string sql = @"SELECT * FROM CrudSchema.Task";

            return await _dapper.LoadData<Todo>(sql);
        }
        public async Task<Todo?> GetTaskById(int id)
        {
            string sql = @"SELECT * FROM CrudSchema.Task WHERE TaskId = @Id";

            return await _dapper.LoadDataSingle<Todo>(sql, new { Id = id });
        }
        public async Task<bool> Add(TodoDto todoDto)
        {
            string sql = @"INSERT INTO CrudSchema.Task (Title, Description, IsCompleted) 
                            VALUES (@Title, @Description, @IsCompleted)";

            return await _dapper.ExecuteSql(sql, todoDto);
        }
        public async Task<bool> Update(int id, TodoDto todoDto)
        {
            string sql = @"UPDATE CrudSchema.Task
                            SET Title = @Title,
                            Description = @Description,
                            IsCompleted = @IsCompleted,
                            UpdatedAt = GETDATE()
                            WHERE TaskId = @Id";

            var parameter = new DynamicParameters(todoDto);
            parameter.Add("Id", id);

            return await _dapper.ExecuteSql(sql, parameter);
        }
        public async Task<bool> Delete(int id)
        {
            string sql = @"DELETE FROM CrudSchema.Task 
                        WHERE TaskId = @Id";

            return await _dapper.ExecuteSql(sql, new { Id = id });
        }
    }
}
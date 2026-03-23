using System.Data.Common;
using Dapper;
using Microsoft.Data.SqlClient;

namespace HCrudAPI.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _config;

        public DapperContext(IConfiguration config)
        {
            _config = config;
        }

        private DbConnection CreateConnection()
        {
            return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        }

        public async Task<IEnumerable<T>> LoadData<T>(string sql)
        {
            using var connection = CreateConnection();

            return await connection.QueryAsync<T>(sql);
        }

        public async Task<T?> LoadDataSingle<T>(string sql, object? parameter = null)
        {
            using var connection = CreateConnection();

            return await connection.QuerySingleOrDefaultAsync<T>(sql, parameter);
        }

        public async Task<bool> ExecuteSql(string sql, object? parameter = null)
        {
            using var connection = CreateConnection();

            return await connection.ExecuteAsync(sql, parameter) > 0;
        }
    }
}
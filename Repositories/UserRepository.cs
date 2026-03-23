using System.Security.Cryptography;
using System.Text;
using HCrudAPI.Data;
using HCrudAPI.DTOs;
using HCrudAPI.Models;
using HCrudAPI.Repositories.interfaces;

namespace HCrudAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _dapper;
        public UserRepository(DapperContext context)
        {
            _dapper = context;
        }
        public async Task<bool> Register(UserDto userDto)
        {
            using var hmac = new HMACSHA512();

            byte[] passwordSalt = hmac.Key;
            byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

            string sql = @"INSERT INTO CrudSchema.Users (Email, PasswordHash, PasswordSalt) VALUES (@Email, @PasswordHash, @PasswordSalt)";

            return await _dapper.ExecuteSql(sql, new
            {
                Email = userDto.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            });
        }
        public async Task<bool> UserExists(string email)
        {
            string sql = @"SELECT * FROM CrudSchema.Users WHERE Email = @Email";
            var user = await _dapper.LoadDataSingle<User>(sql, new { Email = email });

            return user != null;
        }
        public async Task<User?> GetUserByEmail(string email)
        {
            string sql = @"SELECT * FROM CrudSchema.Users WHERE Email = @Email";

            return await _dapper.LoadDataSingle<User>(sql, new { Email = email });
        }
    }
}
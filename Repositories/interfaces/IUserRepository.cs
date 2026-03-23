using HCrudAPI.DTOs;
using HCrudAPI.Models;

namespace HCrudAPI.Repositories.interfaces
{
    public interface IUserRepository
    {
        Task<bool> Register(UserDto userDto);
        Task<bool> UserExists(string email);
        Task<User?> GetUserByEmail(string email);
    }
}
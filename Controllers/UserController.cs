using System.Security.Cryptography;
using System.Text;
using HCrudAPI.DTOs;
using HCrudAPI.Repositories.interfaces;
using HCrudAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HCrudAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _user;
        private readonly ITokenService _token;
        public UserController(IUserRepository user, ITokenService token)
        {
            _user = user;
            _token = token;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            if (await _user.UserExists(userDto.Email))
                return BadRequest("User already exists");

            var response = await _user.Register(userDto);

            if (!response)
                return StatusCode(500, "Failed to register");

            return CreatedAtAction(nameof(Login), new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var user = await _user.GetUserByEmail(userDto.Email);

            if (user == null)
                return Unauthorized("Invalid email or password");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
                return Unauthorized("Invalid email or password");

            return Ok(new { token = _token.CreateToken(userDto.Email) });
        }

    }
}
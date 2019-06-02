using BookRepository.DTOs;
using BookRepository.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookRepository.Controllers
{
    [Route("identity")]
    public class IdentityController : Controller
    {
        private readonly IdentityService _identityService;
        public IdentityController(IdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("login")]
        public IActionResult Login()
        {
            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]AuthDto registerDto)
        {
            var authResponse = await _identityService.RegisterAsync(registerDto.Username, registerDto.Password);

            if(!authResponse.Success)
            {
                return BadRequest(new { Errors = authResponse.Errors });
            }

            return Ok(new { Token = authResponse.Token });
        }
    }
}

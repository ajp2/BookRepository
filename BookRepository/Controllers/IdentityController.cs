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
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly IdentityService _identityService;
        public IdentityController(IdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]AuthDto loginDto)
        {
            var authResponse = await _identityService.LoginAsync(loginDto.Username, loginDto.Password);

            if (!authResponse.Success)
            {
                return BadRequest(new { Errors = authResponse.Errors });
            }

            return Ok(new { Token = authResponse.Token });
        }

        [HttpPost("signup")]
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

using BookRepository.DTOs;
using BookRepository.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Controllers
{
    [Route("identity")]
    public class IdentityController
    {
        private readonly IdentityService _identityService;
        public IdentityController(IdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("login")]
        public IActionResult Login()
        {
            //return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]AuthDto registerDto)
        {
            //var authResponse = await _identityService.RegisterAsync(registerDto.Username, registerDto.Password);

            return Ok();
        }
    }
}

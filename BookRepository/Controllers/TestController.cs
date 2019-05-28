﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BookRepository.Controllers
{
    public class TestController : Controller
    {
        [HttpGet("api/test")]
        public IActionResult Get()
        {
            return Ok(new { name = "Test" });
        }
    }
}
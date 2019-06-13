using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookRepository.DTOs;
using BookRepository.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookRepository.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class ChapterController : ControllerBase
    {
        IChapterRepository _repo;

        public ChapterController(IChapterRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetAll(string bookId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var chapters = await _repo.GetChaptersByBookIdAsync(bookId, userId);
            var chapterResponses = new List<ChapterResponseDto>();
            foreach (var chapter in chapters)
            {
                var chapterResponse = new ChapterResponseDto
                {
                    Id = chapter.Id,
                    ChapterNumber = chapter.ChapterNumber,
                    Content = chapter.Content,
                    BookId = chapter.BookId
                };
                chapterResponses.Add(chapterResponse);
            }

            return Ok(chapterResponses);
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> Create(Chapter chapter)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await _repo.CreateChapterAsync(chapter, userId);

            var chapterResponse = new ChapterResponseDto
            {
                Id = chapter.Id,
                ChapterNumber = chapter.ChapterNumber,
                Content = chapter.Content,
                BookId = chapter.BookId
            };

            string location = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}/chapters/{chapter.Id}";
            return Created(location, chapterResponse);
        }

        [HttpPut("{bookId}")]
        public async Task<IActionResult> Update(Chapter chapter)
        {
            return Ok();
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> Delete(int chapterId)
        {
            return Ok();
        }
    }
}
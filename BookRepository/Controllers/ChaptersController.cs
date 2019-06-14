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
    public class ChaptersController : ControllerBase
    {
        IChapterRepository _repo;

        public ChaptersController(IChapterRepository repo)
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

        [HttpPut("{chapterId}")]
        public async Task<IActionResult> Update(int chapterId, Chapter chapter)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            bool updated = await _repo.UpdateChapterAsync(chapter, userId);
            if (updated)
            {
                var chapterResponse = new ChapterResponseDto
                {
                    Id = chapter.Id,
                    ChapterNumber = chapter.ChapterNumber,
                    Content = chapter.Content,
                    BookId = chapter.BookId
                };
                return Ok(chapterResponse);
            }
            return NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int chapterId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            bool deleted = await _repo.DeleteChapterAsync(chapterId, userId);
            if (deleted)
                return NoContent();
            return NotFound();
        }
    }
}
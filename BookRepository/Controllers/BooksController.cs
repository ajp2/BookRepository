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
    public class BooksController : ControllerBase
    {
        IBookRepository _repo;

        public BooksController(IBookRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repo.GetBooksAsync());
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> Get(string bookId)
        {
            var retrievedBook = await _repo.GetBookByIdAsync(bookId);

            if (retrievedBook == null)
                return NotFound();

            var bookResponse = new BookResponseDto
            {
                Id = retrievedBook.Id,
                Read = retrievedBook.Read
            };

            return Ok(bookResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Book book)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await _repo.CreateBookAsync(book, userId);

            var bookResponse = new BookResponseDto
            {
                Id = book.Id,
                Read = book.Read
            };

            string location = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}/books/{book.Id}";
            return Created(location, bookResponse);
        }

        [HttpPut("{bookId}")]
        public async Task<IActionResult> Update(string bookId, Book bookToUpdate)
        {
            if (bookToUpdate.Id == null)
            {
                bookToUpdate.Id = bookId;
            };

            bool updated = await _repo.UpdateBookAsync(bookToUpdate);
            if (updated)
            {
                var bookResponse = new BookResponseDto
                {
                    Id = bookToUpdate.Id,
                    Read = bookToUpdate.Read
                };
                return Ok(bookResponse);
            }
            return NotFound();
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> Delete(string bookId)
        {
            bool deleted = await _repo.DeleteBookAsync(bookId);
            if (deleted)
                return NoContent();
            return NotFound();
        }
    }
}
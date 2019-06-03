using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookRepository.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookRepository.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

            return Ok(retrievedBook);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Book book)
        {
            if (string.IsNullOrEmpty(book.Id))
                book.Id = Guid.NewGuid().ToString();

            await _repo.CreateBookAsync(book);

            string location = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}/books/{book.Id}";
            return Created(location, book);
        }

        [HttpPut("{bookId}")]
        public async Task<IActionResult> Update(string bookId, Book bookToUpdate)
        {
            bool updated = await _repo.UpdateBookAsync(bookToUpdate);
            if (updated)
                return Ok(bookToUpdate);
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
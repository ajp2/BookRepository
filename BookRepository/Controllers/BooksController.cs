using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookRepository.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookRepository.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        IBookRepository _repo;

        public BooksController(IBookRepository repo)
        {
            _repo = repo;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repo.GetBooksAsync());
        }

        [Route("{bookId}")]
        [HttpGet]
        public async Task<IActionResult> Get(string bookId)
        {
            var retrievedBook = await _repo.GetBookByIdAsync(bookId);

            if (retrievedBook == null)
                return NotFound();

            return Ok(retrievedBook);
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> Create(Book book)
        {
            if (string.IsNullOrEmpty(book.Id))
                book.Id = Guid.NewGuid().ToString();

            await _repo.CreateBookAsync(book);

            string location = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}/books/{book.Id}";
            return Created(location, book);
        }

        [Route("{bookId}")]
        [HttpPut]
        public async Task<IActionResult> Update(string bookId, Book bookToUpdate)
        {
            bool updated = await _repo.UpdateBookAsync(bookToUpdate);
            if (updated)
                return Ok(bookToUpdate);
            return NotFound();
        }

        [Route("{bookId}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(string bookId)
        {
            bool deleted = await _repo.DeleteBookAsync(bookId);
            if (deleted)
                return NoContent();
            return NotFound();
        }
    }
}
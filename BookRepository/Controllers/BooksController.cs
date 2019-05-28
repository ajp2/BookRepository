using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookRepository.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookRepository.Controllers
{
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
        public IActionResult GetAll()
        {
            return Ok(_repo.GetBooks());
        }

        [Route("{bookId}")]
        [HttpGet]
        public IActionResult Get(string bookId)
        {
            var retrievedBook = _repo.GetBookById(bookId);

            if (retrievedBook == null)
                return NotFound();

            return Ok(retrievedBook);
        }

        //[Route("")]
        //[HttpPost]
        //public IActionResult Create(Book book)
        //{
        //    if (string.IsNullOrEmpty(book.Id))
        //        book.Id = Guid.NewGuid().ToString();

        //    _books.Add(book);

        //    string location = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}/books/{book.Id}";
        //    return Created(location, book);
        //}
    }
}
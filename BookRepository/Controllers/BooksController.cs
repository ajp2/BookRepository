﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var books = await _repo.GetBooksAsync(userId);
            var bookResponses = new List<BookResponseDto>();
            foreach (var book in books)
            {
                var bookResponse = new BookResponseDto
                {
                    Id = book.Id,
                    Read = book.Read,
                    Title = book.Title,
                    ThumbnailUrl = book.ThumbnailUrl,
                    Authors = book.Authors
                };
                bookResponses.Add(bookResponse);
            }

            return Ok(bookResponses);
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
                Read = retrievedBook.Read,
                Title = retrievedBook.Title,
                ThumbnailUrl = retrievedBook.ThumbnailUrl,
                Authors = retrievedBook.Authors
            };

            return Ok(bookResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Book book)
        {
            var retrievedBook = await _repo.GetBookByIdAsync(book.Id);
            if (retrievedBook != null && retrievedBook.Id == book.Id)
            {
                return UnprocessableEntity();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await _repo.CreateBookAsync(book, userId);

            var bookResponse = new BookResponseDto
            {
                Id = book.Id,
                Read = book.Read,
                Title = book.Title,
                ThumbnailUrl = book.ThumbnailUrl,
                Authors = book.Authors
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            bool updated = await _repo.UpdateBookAsync(bookToUpdate, userId);
            if (updated)
            {
                var bookResponse = new BookResponseDto
                {
                    Id = bookToUpdate.Id,
                    Read = bookToUpdate.Read,
                    Title = bookToUpdate.Title,
                    ThumbnailUrl = bookToUpdate.ThumbnailUrl,
                    Authors = bookToUpdate.Authors
                };
                return Ok(bookResponse);
            }
            return NotFound();
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> Delete(string bookId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            bool deleted = await _repo.DeleteBookAsync(bookId, userId);
            if (deleted)
                return NoContent();
            return NotFound();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public interface IBookRepository
    {
        Task<List<Book>> GetBooksAsync();
        Task<Book> GetBookByIdAsync(string Id);
        Task<bool> CreateBookAsync(Book newBook, string userId);
        Task<bool> UpdateBookAsync(Book bookToUpdate);
        Task<bool> DeleteBookAsync(string Id);
    }
}

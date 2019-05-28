using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public interface IBookRepository
    {
        List<Book> GetBooks();
        Book GetBookById(string Id);
    }
}

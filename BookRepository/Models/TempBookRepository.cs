using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class TempBookRepository : IBookRepository
    {
        private readonly List<Book> _books;
        public TempBookRepository()
        {
            _books = new List<Book>();
            for (int i = 0; i < 5; i++)
            {
                _books.Add(new Book { Id = Guid.NewGuid().ToString(), Title = $"title {i}" });
            }
        }

        public List<Book> GetBooks()
        {
            return _books;
        }

        public Book GetBookById(string Id)
        {
            return _books.FirstOrDefault(book => book.Id.Equals(Id));
        }
    }
}

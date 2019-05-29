using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class TempBookRepository
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

        public List<Book> GetBooksAsync()
        {
            return _books;
        }

        public Book GetBookByIdAsync(string Id)
        {
            return _books.FirstOrDefault(book => book.Id == Id);
        }

        public bool CreateBookAsync(Book newBook)
        {
            _books.Add(newBook);
            return true;
        }

        public bool UpdateBookAsync(Book bookToUpdate)
        {
            bool exists = GetBookByIdAsync(bookToUpdate.Id) != null;
            if (!exists)
                return false;

            int index = _books.FindIndex(book => book.Id == bookToUpdate.Id);
            _books[index] = bookToUpdate;
            return true;
        }

        public bool DeleteBookAsync(string Id)
        {
            Book book = GetBookByIdAsync(Id);
            if (book == null)
                return false;

            _books.Remove(book);
            return true;
        }
    }
}

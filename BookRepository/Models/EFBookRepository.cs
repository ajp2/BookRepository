using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class EFBookRepository : IBookRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public EFBookRepository(AppDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(string Id)
        {
            return await _context.Books.SingleOrDefaultAsync(book => book.Id == Id);
        }

        public async Task<bool> UpdateBookAsync(Book bookToUpdate)
        {
            _context.Books.Update(bookToUpdate);
            var updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> CreateBookAsync(Book newBook, string userId)
        {
            var currentUser = _userManager.Users.FirstOrDefault(u => u.Id == userId);
            newBook.User = currentUser;

            await _context.Books.AddAsync(newBook);
            var created = await _context.SaveChangesAsync();
            return created > 0;
        }

        public async Task<bool> DeleteBookAsync(string Id)
        {
            var book = await GetBookByIdAsync(Id);
            _context.Books.Remove(book);
            var deleted = await _context.SaveChangesAsync();
            return deleted > 0;
        }
    }
}

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class EFChapterRepository : IChapterRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public EFChapterRepository(AppDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<List<Chapter>> GetChaptersByBookIdAsync(string bookId, string userId)
        {
            return await _context.Chapters.Where(chapter => chapter.UserId == userId && chapter.BookId == bookId).ToListAsync();
        }

        public async Task<bool> CreateChapterAsync(Chapter newChapter, string userId)
        {
            var currentUser = _userManager.Users.FirstOrDefault(u => u.Id == userId);
            newChapter.UserId = userId;
            newChapter.User = currentUser;

            await _context.Chapters.AddAsync(newChapter);
            var created = await _context.SaveChangesAsync();
            return created > 0;
        }

        public Task<bool> DeleteChapterAsync(int Id, string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<Chapter> GetChapterByIdAsync(int Id)
        {
            return await _context.Chapters.SingleOrDefaultAsync(chapter => chapter.Id == Id);
        }

        public Task<List<Chapter>> GetChaptersAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateChapterAsync(Chapter chapterToUpdate, string userId)
        {
            throw new NotImplementedException();
        }
    }
}

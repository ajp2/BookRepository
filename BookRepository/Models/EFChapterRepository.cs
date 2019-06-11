using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class EFChapterRepository : IChapterRepository
    {
        public Task<bool> CreateChapterAsync(Chapter newChapter, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteChapterAsync(string Id, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<Chapter> GetChapterByIdAsync(string Id)
        {
            throw new NotImplementedException();
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

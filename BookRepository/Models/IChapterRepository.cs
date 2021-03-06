﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public interface IChapterRepository
    {
        Task<List<Chapter>> GetChaptersByBookIdAsync(string bookId, string userId);
        Task<Chapter> GetChapterByIdAsync(int Id);
        Task<bool> CreateChapterAsync(Chapter newChapter, string userId);
        Task<bool> UpdateChapterAsync(Chapter chapterToUpdate, string userId);
        Task<bool> DeleteChapterAsync(int Id, string userId);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.DTOs
{
    public class ChapterResponseDto
    {
        public int Id { get; set; }
        public int ChapterNumber { get; set; }
        public string Content { get; set; }
        public string BookId { get; set; }
    }
}

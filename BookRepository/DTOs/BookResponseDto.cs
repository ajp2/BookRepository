using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.DTOs
{
    public class BookResponseDto
    {
        public string Id { get; set; }
        public bool Read { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Authors { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class Book
    {
        public string Id { get; set; }
        public bool Read { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Authors { get; set; }
        public IdentityUser User { get; set; }
        public IEnumerable<Chapter> Chapters { get; set; }
    }
}

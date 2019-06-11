using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRepository.Models
{
    public class Chapter
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string BookId { get; set; }
        public Book Book { get; set; }
    }
}

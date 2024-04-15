using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Domain.Entities
{
    public class Module
    {

        public int Id { get; set; }

        
        [MaxLength(100)]
        public string Name { get; set; }
        
        [MaxLength(100)]
        public string Code { get; set; }
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }


    }
}

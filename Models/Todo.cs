namespace HCrudAPI.Models
{
    public class Todo
    {
        public int TaskId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}


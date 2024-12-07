using Microsoft.AspNetCore.Mvc;

namespace _932201.lozovoi.pavel.lab12.Models
{
    public class NumberInput
    {
        [FromForm(Name = "one")]
        public int one { get; set; }
        [FromForm(Name = "two")]
        public int two { get; set; }
        [FromForm(Name = "oper")]
        public string oper { get; set; }

        public int sum => one + two;
        public int sub => one - two;
        public int mult => one * two;
        public float div => (two == 0) ? -1 : (float)one / (float)two;
        public string divResult => (div < 0) ? "- Cannot do that!" : "= " + string.Format("{0:N2}", div);
    }
}

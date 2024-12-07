using System.Diagnostics;
using _932201.lozovoi.pavel.lab12.Models;
using Microsoft.AspNetCore.Mvc;

namespace _932201.lozovoi.pavel.lab12.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewBag.FormSubmitted = false;
            return View();
        }

        private void Calc(double one, double two, string oper)
        {

            double result = 0;
            string output = "";

            switch (oper)
            {
                case "+":
                    result = one + two;
                    break;
                case "-":
                    result = one - two;
                    break;
                case "*":
                    result = one * two;
                    break;
                case "/":
                    if (two == 0) output = "- Cannot do this!";
                    else result = one / two;
                    break;
            }
            if (output == "")
            {
                output = "= " + string.Format("{0:N2}", result);
            }
            ViewBag.one = one;
            ViewBag.two = two;
            ViewBag.oper = oper;
            ViewBag.Result = output;
            ViewBag.FormSubmitted = true;
        }

        public IActionResult ManualSingle()
        {
            if (Request.Method == "POST")
            {
                IFormCollection form = Request.Form;
                double one = Double.Parse(form["one"]);
                double two = Double.Parse(form["two"]);
                string oper = form["oper"];
                Calc(one, two, oper);
            }
            return View();
        }

        [HttpGet, ActionName("ManualSeparate")]
        public IActionResult ManualSeparateGet()
        {
            return View();
        }

        [HttpPost, ActionName("ManualSeparate")]
        public IActionResult ManualSeparatePost()
        {
            IFormCollection form = Request.Form;
            double one = Double.Parse(form["one"]);
            double two = Double.Parse(form["two"]);
            string oper = form["oper"];
            Calc(one, two, oper);
            
            return View();
        }

        public IActionResult ModelParameters(double one, double two, string oper)
        {
            if (Request.Method == "POST")
            {
                Calc(one, two, oper);
            }
            return View();
        }
        
        public IActionResult ModelSeparate(NumberInput num)
        {
            if(Request.Method == "POST")
            {
                Calc(num.one, num.two, num.oper);
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

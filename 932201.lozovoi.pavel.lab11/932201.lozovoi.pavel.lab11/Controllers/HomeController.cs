using System.Diagnostics;
using System.Reflection;
using _932201.lozovoi.pavel.lab11.Models;
using Microsoft.AspNetCore.Mvc;

namespace _932201.lozovoi.pavel.lab11.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private RandomNum NewRandomNum()
        {
            Random rand = new Random(DateTime.Now.Millisecond);
            var model = new RandomNum()
            {
                one = rand.Next(0, 10),
                two = rand.Next(0, 10)
            };
            return model;
        }
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult PassUsingModel()
        {
            return View(NewRandomNum());
        }

        public IActionResult PassUsingViewData()
        {
            ViewData["RandomNum"] = NewRandomNum();
            return View();
        }
        public IActionResult PassUsingViewBag()
        {

            ViewBag.RandomNum = NewRandomNum();
            return View();
        }

        public IActionResult AccessServiceDirectly()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

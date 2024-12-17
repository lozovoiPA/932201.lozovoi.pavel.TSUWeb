using System.Diagnostics;
using lplab13.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace lplab13.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHttpContextAccessor _contx;

        private QuestionList ql;
        public HomeController(ILogger<HomeController> logger, IHttpContextAccessor contx)
        {
            _logger = logger;
            _contx = contx;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Quiz(QuestionList qlt, string step)
        {
            ql = JsonConvert.DeserializeObject<QuestionList>(_contx.HttpContext.Session.GetString("Quiz"));
            if (ModelState.IsValid)
            {
                ql.usr_answ[ql.count - 1] = qlt.answer;

                switch (step)
                {
                    case "Next":
                        ViewBag.QuizState = 0;
                        Question q = new Question();
                        ql.Add(q);
                        break;
                    case "Finish":
                        ql.Calc();
                        ViewBag.QuizState = 1;
                        break;
                }
                string quiz = JsonConvert.SerializeObject(ql);
                _contx.HttpContext.Session.SetString("Quiz", quiz);
            }
            else
            {
                ViewBag.QuizState = 0;
                ModelState.AddModelError("answerError", "Пожалуйста введите число или оставьте поле пустым!");
            }
            return View(ql);
        }

        [HttpGet]
        public IActionResult Quiz(string step)
        {
            if (_contx.HttpContext.Session.GetString("Quiz") == null)
            {
                ql = new QuestionList();
            }
            else
            {
                ql = JsonConvert.DeserializeObject<QuestionList>(_contx.HttpContext.Session.GetString("Quiz"));
            }
            Question q;
            switch (step)
            {
                case "Quiz":
                    ViewBag.QuizState = 0;
                    if (!(ql.count != 0 && !ql.finished)) // start new quiz only if there was no quiz or previous was finished
                    {
                        ql.Clear();
                        ql = new QuestionList();
                        q = new Question();
                        ql.Add(q);
                    }
                    break;
                case "Results":
                    if (ql.finished)
                    {
                        ViewBag.QuizState = 1;
                    }
                    else
                    {
                        ViewBag.QuizState = -1;
                    }
                    break;
            }
            string quiz = JsonConvert.SerializeObject(ql);
            _contx.HttpContext.Session.SetString("Quiz", quiz);
            return View(ql);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

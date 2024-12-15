using Microsoft.AspNetCore.Mvc;

namespace _932201.lozovoi.pavel.lab13__.Models
{
    public class Question
    {
        public int one { get; set; }
        public int two { get; set; }
        public string oper { get; set; }
        public double answ { get; set; }
        public double usr_answ { get; set; }

        public Question()
        {
            Random rand = new Random(DateTime.Now.Millisecond);
            int opernum = rand.Next(4);
            oper = "";
            answ = 0;
            if (opernum == 3)
            {
                two = rand.Next(9) + 1;
            }
            else
            {
                two = rand.Next(10);
            }
            one = rand.Next(10);
            switch (opernum)
            {
                case 0:
                    oper = "+";
                    answ = one + two;
                    break;
                case 1:
                    oper = "-";
                    answ = one - two;
                    break;
                case 2:
                    oper = "*";
                    answ = one * two;
                    break;
                case 3:
                    oper = "/";
                    answ = one / two;
                    break;
            }
        }
    }
    public class QuestionList
    {
        public List<int> one = new List<int>();
        public List<int> two = new List<int>();
        public List<string> oper = new List<string>();
        public List<double> answ = new List<double>();
        public List<double?> usr_answ = new List<double?>(); // make nullable so that if usr_answ[i] == null, there was no answer from user
        
        public int count = 0;
        public int r_answ = 0;

        [FromForm(Name = "answer")]
        public double? answer { get; set; }
        public bool finished = false;
        public void Add(Question question)
        {
            Random rand = new Random(DateTime.Now.Millisecond);
            int opernum = rand.Next(4);
            answ.Add(0);
            usr_answ.Add(0);
            if (opernum == 3)
            {
                two.Add(rand.Next(9) + 1);
            }
            else
            {
                two.Add(rand.Next(10));
            }
            one.Add(rand.Next(10));
            oper.Add("");
            switch (opernum)
            {
                case 0:
                    oper[count] = "+";
                    answ[count] = one[count] + two[count];
                    break;
                case 1:
                    oper[count] = "-";
                    answ[count] = one[count] - two[count];
                    break;
                case 2:
                    oper[count] = "*";
                    answ[count] = one[count] * two[count];
                    break;
                case 3:
                    oper[count] = "/";
                    answ[count] = (double)one[count] / (double)two[count];
                    break;
            }

            count++;
        }
        public void Clear()
        {
            one.Clear();
            two.Clear();
            oper.Clear();
            answ.Clear();
            usr_answ.Clear();
            count = 0;
            r_answ = 0;
            finished = false;
        }
        public void Calc()
        {
            for(int i = 0; i < count; i++)
            {
                if (answ[i] == usr_answ[i])
                    r_answ++;
            }
            finished = true;
        }
    }
}

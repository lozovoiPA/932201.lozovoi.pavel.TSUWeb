namespace _932201.lozovoi.pavel.lab11.Services
{
    public class CalcService
    {
        public int one;
        public int two;

        private Random rand;
        public CalcService()
        {
            rand = new Random(DateTime.Now.Millisecond);
            one = rand.Next(0, 10);
            two = rand.Next(0, 10);
        }
        public int Sum()
        {
            return one + two;
        }
        public int Sub()
        {
            return one - two;
        }
        public int Mult()
        {
            return one * two;
        }
        public float Div()
        {
            if (two == 0) return -1;
            return (float)one / (float)two;
        }
        public string DivResult()
        {
            var t = Div();
            if (t < 0) return "- Cannot do that!";
            return "= " + string.Format("{0:N2}", t);
        }
    }
}

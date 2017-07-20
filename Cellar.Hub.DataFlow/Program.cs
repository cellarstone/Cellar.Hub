using System;
using System.Linq;

namespace Cellar.Hub.DataFlow
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            BloggingContext cont = new BloggingContext();

            var aaa = cont.Blogs.ToList();

            foreach (var item in aaa)
            {
                Console.WriteLine(item.Url);
            }


            Console.ReadLine();
        }
    }
}

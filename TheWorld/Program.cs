using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace TheWorld
{
    public class Program
    {
        public static void Main(string[] args)
        {
#if DEBUG
            TelemetryConfiguration.Active.DisableTelemetry = true;
#endif

            TaskScheduler.UnobservedTaskException += (sender, e) =>
            {
                Console.WriteLine("Unobserved exception: {0}", e.Exception);
            };

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheWorld.Services
{
    public interface IMailService
    {
        void SendMail(string to, string ftom, string subject, string body);
    }
}

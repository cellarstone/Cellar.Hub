using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowCore.Interface;
using WorkflowCore.Models;

namespace Cellar.Hub.WorkFlow.a
{public class HelloWorldWorkflow : IWorkflow
    {
        public void Build(IWorkflowBuilder<object> builder)
        {
            builder                
                .StartWith<HelloWorld>()
                .Then<GoodbyeWorld>();
        }

        public string Id => "HelloWorld";
            
        public int Version => 1;
                 
    }
}
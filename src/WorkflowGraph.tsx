import { useEffect } from "react";
import { workflowToDOT, getWorkflows, Workflow } from "./Workflow";
import Graph from "./Graph";

export default function WorkflowGraph({ workflows }: WorkflowGraphProps) {
  const w = getWorkflows(workflows);
  if (!w) {
    console.log(workflows);

    return null;
  }

  useEffect(() => {}, []);

  return (
    <div>
      {w.map((workflow) => (
        <Graph dot={workflowToDOT(workflow)} key={workflow.name} />
      ))}
    </div>
  );
}

interface WorkflowGraphProps {
  workflows: Workflow[];
}

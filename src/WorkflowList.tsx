import { getWorkflows, workflowToHTML } from "./Workflow";

export default function WorkflowList({ workflows }: WorkflowListProps) {
  const w = getWorkflows(workflows);

  const highlightTarget = (target) => () => {
    document.querySelector(`#${target}`)?.classList.add("target");
  };

  const unhighlightTarget = (target) => () => {
    document.querySelector(`#${target}`)?.classList.remove("target");
  };

  const validateRequirements = (target) => {
    return document.querySelector(`#${target}`) ? "valid" : "invalid";
  };

  return (
    <>
      {w.map((workflow) => (
        <div>
          <h2 id={workflow.name}>{workflow.name}</h2>
          {workflow.jobs?.map((job) => (
            <div>
              <h3 id={job.name}>{job.name}</h3>
              <ul>
                {job.requirements?.map((requirement) => (
                  <li
                    onMouseEnter={highlightTarget(requirement)}
                    onMouseLeave={unhighlightTarget(requirement)}
                  >
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

interface WorkflowListProps {
  workflows: Yaml;
}

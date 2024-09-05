export function getWorkflows(config: Yaml) {
  const workflows: Workflow[] = [];

  Object.entries(config).forEach(([workflowName, workflowConfig]) => {
    const workflow = {
      name: workflowName,
      jobs: [],
    };

    workflowConfig.jobs.forEach((job) => {
      workflow.jobs.push({
        name: getName(job) ?? Object.keys(job)[0],
        requirements: getRequirements(job),
      });
    });

    workflows.push(workflow);
  });

  return workflows;
}

function getName(config) {
  let name = null;
  for (const [key, val] of Object.entries(config)) {
    if (name) {
      break;
    }

    if (key === "name") {
      name = val;
      break;
    }

    if (typeof val === "object") {
      name = getName(val);
    }
  }
  return name;
}

function getRequirements(config) {
  const entries = [];
  Object.entries(config).forEach(([key, val]) => {
    if (key === "requires") {
      entries.push(val);
    }

    if (typeof val === "object") {
      entries.push(getRequirements(val).flat());
    }
  });
  return entries.flat();
}

export function workflowToDOT(workflow): string {
  const deps = [];

  workflow.jobs?.forEach((job) => {
    job.requirements?.forEach((item) => {
      deps.push(`\t"${item}" -> "${job.name}"`);
    });
  });

  return `digraph dependencies {\n${deps.join(";\n")}\n}`;
}

export interface Workflow {
  name: string;
  jobs: Job[];
}

export interface Job {
  name: string;
  requirements: string[];
}

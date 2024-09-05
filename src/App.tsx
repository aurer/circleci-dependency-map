import { parse } from "yaml";
import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import "./App.css";
import WorkflowList from "./WorkflowList";
import WorkflowGraph from "./WorkflowGraph";

function App() {
  const [yaml, setYaml] = useState<unknown | null>(null);
  const [yamlError, setYamlError] = useState(null);

  function handleInput(text: string) {
    setYamlError(null);
    try {
      const yamlValue = parse(text);
      if (!yamlValue.workflows) {
        throw new Error("Config does not contain any workflows");
      }
      setYaml(yamlValue);
    } catch (err: unknown) {
      setYaml(null);
      setYamlError(err.message);
    }
  }

  const handlePaste = useCallback((e) => {
    let pastedData = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    handleInput(pastedData);
  }, []);

  const reset = () => {
    setYaml(null);
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div>
      {yaml ? (
        <>
          <button className="reset" onClick={reset}>
            Reset
          </button>
          <div className="output">
            <WorkflowGraph workflows={yaml.workflows} />
            <WorkflowList workflows={yaml.workflows} />
          </div>
        </>
      ) : (
        <Input onChange={handleInput} />
      )}
      {!!yamlError && (
        <div className="yamlError">Invalid YAML: {yamlError}</div>
      )}
    </div>
  );
}

export default App;

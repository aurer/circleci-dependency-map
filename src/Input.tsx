import { useCallback, useState } from "react";

export default function Input({ onPaste }: InputProps) {
  const [text, setText] = useState("");

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      setText(e.target.value);
    },
    [onPaste]
  );

  return (
    <>
      <textarea
        placeholder="Paste your config here..."
        autoFocus
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

interface InputProps {
  onPaste: (data: unknown) => void;
}

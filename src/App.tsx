import { useState } from "react";
import "./App.css";
import { EditorLayout } from "./editor/layouts/EditorLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="studio_frame">
        <EditorLayout />
      </div>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SceneEditor from "./pages/scene-editor";

function App() {
  return (
    <div className="bg-black-500 text-text-primary relative flex h-screen max-h-screen w-screen max-w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SceneEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

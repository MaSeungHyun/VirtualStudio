import { BrowserRouter, Route, Routes } from "react-router-dom";
import SceneEditor from "./pages/scene-editor";
import { ProgressProvider } from "./context/ProgressProvider";
import { ContextProvider } from "./context/ContextProvider";
import TitleBar from "./TitleBar";

function App() {
  return (
    <ContextProvider>
      <div className="bg-black-500 text-text-primary relative flex h-screen max-h-screen w-screen max-w-full flex-col">
        <TitleBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SceneEditor />} />
          </Routes>
        </BrowserRouter>
        <ProgressProvider />
      </div>
    </ContextProvider>
  );
}

export default App;

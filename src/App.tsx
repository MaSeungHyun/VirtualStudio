import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-black-500 text-text-primary relative flex h-screen max-h-screen w-screen max-w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">
                Hello World!
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

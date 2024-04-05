import Form from "./components/Form";
import ThanksPage from "./components/ThanksPage";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"loading.."}>
        <Routes>
          <Route path="/feedback" element={<Form />} />
          <Route path="/submitted" element={<ThanksPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

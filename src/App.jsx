import Form from "./components/Form";
import ThanksPage from "./components/ThanksPage";
import Error from "./components/Error";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"loading.."}>
        <Routes>
          <Route path="/feedback" element={<Form />} />
          <Route path="/submitted" element={<ThanksPage />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

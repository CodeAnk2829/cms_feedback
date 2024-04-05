// import { useState, useEffect } from "react";

// import Feedback from "./components/FeedbackComponent";
// import Another from "./components/AnotherComponent";

// function App() {
//   const [feedbackPage, setFeedbackPage] = useState(false);

//   useEffect(() => {

//     const checkFeedbackPageStatus = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/feedback-page-status");
//         const data = await res.json();

//         setFeedbackPage(data.feedbackPage);
//       } catch(err) {
//         console.log("Error while fetching the feedback page");
//       }
//     }

//     // check the feedback component every minute
//     const interval = setInterval(checkFeedbackPageStatus, 60 * 1000);

//     // check the feedback page status for the first time
//     checkFeedbackPageStatus();

//     return () => {
//       clearInterval(interval);
//     }
//   }, []);

//   return (
//     <>
//     {feedbackPage ? (
//       <Feedback />
//     ) : (
//       <Another />
//     )}

//     </>
//   );
// }

// export default App;

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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/singlepost" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

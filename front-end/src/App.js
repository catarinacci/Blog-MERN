import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import SinglePost from "./pages/SinglePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />          
            <Route path="/singlepost" element={<SinglePost />} /> */}
          </Routes>
        </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  );
}

export default App;

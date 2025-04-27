import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Home from "./Pages/Home";
import PageNotFound from "./components/PageNotFound";
import CreateTask from "./Pages/Admin/CreateTask"
import GetTast from "./Pages/Admin/GetTask";
import Update from "./Pages/Admin/Update"
import PrivateHome from './Routes/PrivateHome'

function App() {
  return (
    <>
      <Toaster />
      {/* <Signup/> */}

      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />


          <Route path="/home" element={<PrivateHome />}>
            <Route path="" element={<Home />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="get-tasks" element={<GetTast />} />
            <Route path="update/:taskId" element={<Update />} />
          </Route>

         

        </Routes>
      </Router>
    </>
  );
}

export default App;

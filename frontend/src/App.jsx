import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import PrivateRoute from "./Routes/private";
import PageNotFound from "./components/PageNotFound";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateTask from "./Pages/Admin/CreateTask"
import ProductList from "./Pages/Admin/Products"
import UpdateProducts from "./Pages/Admin/updateProducts";
import GetTast from "./Pages/Admin/GetTask";
import Update from "./Pages/Admin/Update"
import Users from "./Pages/Admin/Users";
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
          {/* <Route path="/home" element={<Home />} /> */}
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

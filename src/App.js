import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "./pages/NavBar";
// import Footer from "./pages/Footer";
// import About from "./pages/About";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
// import Services from "./pages/Services";
// import Team from "./pages/Team";
// import Contact from "./pages/Contact";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
// import Sidebar from "./pages/Dashboard/Sidebar/Sidebar";
import UploadData from "./components/uploadData/UploadData";
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchDefaulters from "./pages/Dashboard/SearchDefaulters";
import PublicRoutes from "./components/routes/PublicRoutes";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import Report from "./components/Report/Report";
import AdminRoutes from "./components/routes/AdminRoutes";
import SubscriptionPlan from "./components/subscription/SubscriptionPlan";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    //   {/* <NavBar /> */}
    //   {/* <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/services" element={<Services />} />
    //     <Route path="/team" element={<Team />} />
    //     <Route path="/contact" element={<Contact />} />
    //   </Routes> */}
    //   {/* <Footer /> */}
    // 8319106795
    // sadushst

    // </BrowserRouter>
    <>
      <HashRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                  {/* <SubscriptionPlan /> */}
                </ProtectedRoutes>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoutes>
                  <UploadData />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoutes>
                  <SearchDefaulters />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/report/:id"
            element={
              <ProtectedRoutes>
                <Report />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

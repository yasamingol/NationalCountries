import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
const AdminDashboard = lazy(() => import("./pages/Admin"));
const UserDashboard = lazy(() => import("./pages/User"));


function App() {

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
            path="/login"
            element={
                <Login />
            }
          />
          <Route
            path="/register"
            element={
                <Register />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
                <AdminDashboard />
            }
          />
          <Route
            path="/user-dashboard"
            element={
                <UserDashboard />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Members from "./pages/Members";
import BorrowRecords from "./pages/BorrowRecords";
import Login from "./pages/Login";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
       <Route element={ <ProtectedRoute> <DashboardLayout /> </ProtectedRoute> }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/members" element={<Members />} />
          <Route path="/borrow-records" element={<BorrowRecords/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
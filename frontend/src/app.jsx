import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Members from "./pages/Members";
import BorrowRecords from "./pages/BorrowRecords";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>
        <Route element={<DashboardLayout />}>
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
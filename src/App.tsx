import { NavLink, Routes, Route } from "react-router-dom";
import Day1 from "./pages/Day01";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="/day01">Day1</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home（Dayを選んでね）</div>} />
        <Route path="/day01" element={<Day1 />} />
      </Routes>
    </div>
  );
}
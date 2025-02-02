import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;

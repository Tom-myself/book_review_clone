import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Home from "./pages/Home";
import NewBook from "./pages/NewBook";
import { AppProvider } from "./context/AppContext";
import Book from "./pages/Book";
import Post from "./components/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<NewBook />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

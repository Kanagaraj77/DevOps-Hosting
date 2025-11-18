import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Views from "./Views";
import App from "./App";
import { DataProvider } from "./Context.jsx";

const RootComponent = () => {

  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/*" element={<Views />} />
          <Route path="/admin/*" element={<App />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<RootComponent />);

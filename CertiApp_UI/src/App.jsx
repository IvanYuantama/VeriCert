import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import IssueCertificate from "./components/IssueCertificate";
import FormSubmitted from "./components/FormSubmitted";
import View from "./components/View";
import Home from "./components/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register"; // Import Register
import Login from "./pages/Login"; // Import Login

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/issue" element={<IssueCertificate />} />
          <Route path="/thank-you" element={<FormSubmitted />} />
          <Route path="/certificate/:id" element={<View />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

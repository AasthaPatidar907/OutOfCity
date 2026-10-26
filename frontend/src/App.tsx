import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import HostelDetail from "@/pages/HostelDetail";
import Wishlist from "@/pages/Wishlist";
import MyBookings from "@/pages/MyBookings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { EnquiriesProvider } from "@/context/EnquiriesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "hostel/:id", element: <HostelDetail /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "bookings", element: <MyBookings /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <EnquiriesProvider>
          <RouterProvider router={router} />
        </EnquiriesProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

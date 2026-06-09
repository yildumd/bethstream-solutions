import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages — lazy loaded for performance
const Home           = lazy(() => import("../pages/Home"));
const Shop           = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Categories     = lazy(() => import("../pages/Categories"));
const Services       = lazy(() => import("../pages/Services"));
const About          = lazy(() => import("../pages/About"));
const Contact        = lazy(() => import("../pages/Contact"));
const RequestQuote   = lazy(() => import("../pages/RequestQuote"));
const Cart           = lazy(() => import("../pages/Cart"));
const Checkout       = lazy(() => import("../pages/Checkout"));
const Login          = lazy(() => import("../pages/Login"));
const NotFound       = lazy(() => import("../pages/NotFound"));

// Admin
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminProducts  = lazy(() => import("../pages/admin/Products"));
const ProductForm    = lazy(() => import("../pages/admin/ProductForm"));
const AdminOrders    = lazy(() => import("../pages/admin/Orders"));
const AdminQuotes    = lazy(() => import("../pages/admin/Quotes"));
const AdminMessages  = lazy(() => import("../pages/admin/Messages"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white/30 text-sm">Loading...</p>
    </div>
  </div>
);

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/shop"           element={<Shop />} />
          <Route path="/product/:id"    element={<ProductDetails />} />
          <Route path="/categories"     element={<Categories />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/services"       element={<Services />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/request-quote"  element={<RequestQuote />} />
          <Route path="/cart"           element={<Cart />} />
          <Route path="/checkout"       element={<Checkout />} />
          <Route path="/login"          element={<Login />} />
          <Route path="*"               element={<NotFound />} />
        </Route>

        {/* Admin Routes — protected inside AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                      element={<AdminDashboard />} />
          <Route path="products"            element={<AdminProducts />} />
          <Route path="products/new"        element={<ProductForm />} />
          <Route path="products/edit/:id"   element={<ProductForm />} />
          <Route path="orders"              element={<AdminOrders />} />
          <Route path="quotes"              element={<AdminQuotes />} />
          <Route path="messages"            element={<AdminMessages />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

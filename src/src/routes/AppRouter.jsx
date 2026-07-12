import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout  from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

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

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminProducts  = lazy(() => import("../pages/admin/Products"));
const ProductForm    = lazy(() => import("../pages/admin/ProductForm"));
const AdminOrders    = lazy(() => import("../pages/admin/Orders"));
const AdminQuotes    = lazy(() => import("../pages/admin/Quotes"));
const AdminMessages  = lazy(() => import("../pages/admin/Messages"));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-bg">
    <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public — no login needed */}
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

        {/* Admin — protected, redirect to /login if not admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                    element={<AdminDashboard />} />
          <Route path="products"          element={<AdminProducts />} />
          <Route path="products/new"      element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="orders"            element={<AdminOrders />} />
          <Route path="quotes"            element={<AdminQuotes />} />
          <Route path="messages"          element={<AdminMessages />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

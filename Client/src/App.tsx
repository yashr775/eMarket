import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loader from "./components/loader";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/cart"));
const Search = lazy(() => import("./pages/search"));
const Dashboard = lazy(() => import("./pages/pages/Dashboard"));
const Products = lazy(() => import("./pages/pages/Products"));
const Transaction = lazy(() => import("./pages/pages/Transaction"));
const Customers = lazy(() => import("./pages/pages/Customers"));
const BarCharts = lazy(() => import("./pages/pages/Charts/Barcharts"));
const PieCharts = lazy(() => import("./pages/pages/Charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/pages/Charts/LineCharts"));
const NewProduct = lazy(() => import("./pages/pages/management/NewProduct"));
const Header = lazy(() => import("./components/Header"));

const ProductManagement = lazy(
  () => import("./pages/pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/pages/management/TransactionManagement")
);

const Stopwatch = lazy(() => import("./pages/pages/apps/Stopwatch"));
const Toss = lazy(() => import("./pages/pages/apps/Toss"));
const Coupon = lazy(() => import("./pages/pages/apps/Coupon"));
const Shipping = lazy(() => import("./pages/shipping"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/search"} element={<Search />}></Route>
          <Route path={"/cart"} element={<Cart />}></Route>
          <Route path={"/shipping"} element={<Shipping />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/customers" element={<Customers />} />

          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />

          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />

          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/toss" element={<Toss />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

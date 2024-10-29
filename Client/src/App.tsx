import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loader from "./components/loader";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Search = lazy(() => import("./pages/search"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      {" "}
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/search"} element={<Search />}></Route>
          <Route path={"/cart"} element={<Cart />}></Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;

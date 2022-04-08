import { Backdrop } from "components/shared";
import Shell from "layouts/Shell/Shell";
import NotFound from "pages/NotFound/NotFound";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";

const Login = lazy(() => import("pages/Login/Login"));
const Home = lazy(() => import("pages/Home/Home"));
const Detail = lazy(() => import("components/List/Elements/Detail"));

const MainRouter = () => {
  return (
    <Suspense fallback={<Backdrop show />}>
      <Routes>
        <Route element={<ProtectedRouter />}>
          <Route element={<Shell />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route path="/detail">
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;

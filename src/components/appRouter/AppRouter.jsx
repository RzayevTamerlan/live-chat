import {useContext, useState, useEffect,} from "react";
import { Context } from "../..";
import { onAuthStateChanged } from "firebase/auth";

import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => {
        return <Route path={path} element={<Component />}></Route>;
      })}
      <Route
        path="*"
        element={<Navigate to={CHAT_ROUTE} replace />}
    />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => {
        return <Route path={path} element={<Component />}></Route>;
      })}
      <Route
        path="*"
        element={<Navigate to={LOGIN_ROUTE} replace />}
    />
    </Routes>
  );
};

export default AppRouter;

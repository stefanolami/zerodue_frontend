import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = (props) => {
  const location = useLocation();
  return (
    props.context.authenticatedUser ? <Outlet /> : <Navigate to={"/log-in"} state={{from: location}} replace />
  );
};

export default PrivateRoute;
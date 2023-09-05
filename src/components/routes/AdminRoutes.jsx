import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../../redux/features/userSlice";

const AdminRoutes = ({ children }) => {

  const [loggedUser,setLoggedUser] = useState({})

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/getUserData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data.data, "ADMIn");

      setLoggedUser(res.data.data)

      if (res.data.success === true) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to={"/login"} />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (loggedUser.role === "admin") {
    return children;
  }else{
    return
  }
};

export default AdminRoutes;

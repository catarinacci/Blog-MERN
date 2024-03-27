import React from "react";

import { Avatar, Box } from "@mui/material";
import { useEffect } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignInAction } from "../../redux/actions/userAction";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  useEffect(() => {
    // console.log(loading)
    // console.log(userInfo)
    // console.log(isAuthenticated)
    if (isAuthenticated) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data,"dispach")
    dispatch(userSignInAction(data));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockOutlined />
            </Avatar>
            <TextField
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
                  message: "Enter a valid email",
                },
              })}
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              // InputLabelProps={{
              //     shrink: true,
              // }}

              // placeholder="E-mail"
              //value={123}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={errors.email}
              helperText={errors.email && errors.email?.message}
            />
            <TextField
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Enter more than 6 characters",
                },
              })}
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              //type="password"
              // InputLabelProps={{
              //     shrink: true,
              // }}
              //placeholder="Password"
              //value={data}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={errors.password}
              helperText={errors.password && errors.password?.message}
            />

            <Button fullWidth variant="contained" type="submit">
              Log In
            </Button>
          </Box>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default LogIn;

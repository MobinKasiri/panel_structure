import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import apiCall from "../lib/services/apicall";
import Cookies from "js-cookie";
import { accessTokenExist, makeDateFromNow } from "../lib/utils/functions";
import { Navigate, useNavigate } from "react-router-dom";
import { LocalNames } from "../lib/constant/local_enums";
import LoginImage from "../assets/login/image.webp";
// import HoldingImage from "../assets/login/holding.svg";
import { Input } from "design_system";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface IFormInput {
  username: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation<LoginResponse, Error, IFormInput>({
    mutationFn: (data) =>
      apiCall<LoginResponse>({
        url: "/v1/user/auth",
        data: {
          appName: "holding",
          ...data,
        },
        method: "post",
      }),
    onSuccess: (res) => {
      const token = res.jwt;
      if (rememberMe) {
        Cookies.set(LocalNames.token, token, {
          expires: makeDateFromNow(
            import.meta.env.VITE_TOKEN_EXPIRATION_SECOND,
          ),
        });
      } else {
        sessionStorage.setItem(LocalNames.token, token);
      }
      navigate("/");
    },
  });

  const [rememberMe, rememberMeSet] = useState(false);

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ username, password }) => {
    mutate({ username, password });
  };

  const handleCheckFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    rememberMeSet(e.target.checked);
  };

  //  "credential": "admin@satrin.com",
  //  "password": "Ss@12345678"

  if (accessTokenExist()) {
    return <Navigate replace to="/" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        backgroundColor: "lightgray",
      }}
    >
      <img
        style={{ height: "100vh", width: "50%", objectFit: "cover" }}
        src={LoginImage}
      />

      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            gap: 4,
            p: 4,
            borderRadius: 4,
            width: "360px",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <HoldingImage /> */}
          </Box>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                {...rest}
                variant="outlined"
                label="یوزرنیم یا ایمیل"
                inputRef={ref}
                autoComplete="on"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                {...rest}
                variant="outlined"
                label="کلمه عبور"
                type="password"
                inputRef={ref}
                autoComplete="on"
              />
            )}
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ padding: 0, ml: 1 }}
                onChange={handleCheckFunction}
                checked={rememberMe}
                size="small"
              />
            }
            label="مرا به خاطر بسپار"
            sx={{ mr: 0 }}
          />
          <Button type="submit">وارد شوید</Button>
          <Typography sx={{ textAlign: "center" }} className="cursor-pointer">
            فراموشی رمز عبور
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

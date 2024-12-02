import { Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import apiCall from "../lib/services/apicall";
import Cookies from "js-cookie";
import { accessTokenExist, makeDateFromNow } from "../lib/utils/functions";
import { Navigate, useNavigate } from "react-router-dom";
import { LocalNames } from "../lib/constant/local_enums";

interface IFormInput {
  credential: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      credential: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    apiCall<LoginResponse>({
      url: "/api/v1/auth/login",
      data,
      callback: (res) => {
        const token = res.data.token;
        Cookies.set(LocalNames.token, token, {
          expires: makeDateFromNow(
            import.meta.env.VITE_TOKEN_EXPIRATION_SECOND
          ),
        });
        navigate("/");
      },
      method: "post",
    });
  };

  //  "credential": "admin@satrin.com",
  //  "password": "Ss@12345678"

  if (accessTokenExist()) {
    return <Navigate replace to="/" />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="credential"
        control={control}
        render={({ field }) => (
          <TextField {...field} variant="outlined" label="نام کاربری" />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField {...field} variant="outlined" label="کلمه عبور" />
        )}
      />
      <Button type="submit">ورود</Button>
    </Box>
  );
};

export default Login;

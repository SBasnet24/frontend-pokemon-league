import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";

import { AUTH_TYPE, useAuthentication } from "../context/AuthContext";
import { login } from "../service/AuthService";
import { getAccessToken } from "../helpers/accessToken";

const { Group, Label, Control } = { ...Form };
const { Link } = { ...Alert };

const LoginPage = () => {
  const { dispatch, isAuthenticated } = useAuthentication();
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    if (getAccessToken()) {
      navigate("/leagues");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      dispatch({
        type: AUTH_TYPE.LOGIN,
        payload: response,
      });
      setLoading(false);
      toast.success("Logged in successfully");
      navigate("/leagues");
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const onError = (errors) => {
    errors &&
      Object.values(errors).map((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="App">
      <Container className="login-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
          <h3>Login </h3>
          <Group className="mt-3">
            <Label className="label-login">Username</Label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="text" className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="mt-3">
            <Label className="label-login">Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              defaultValue=""
              render={({ field }) => (
                <Control type="password" className="login-input" {...field} />
              )}
            />
          </Group>
          <Group className="login-btn">
            <Button type="submit">
              {isLoading ? <Spinner animation="border" /> : "Login"}
            </Button>
          </Group>
          <div className="link">
            <Link href="/register">Register Trainer</Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;

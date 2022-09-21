import { useAuth } from "../../App/Auth";
import { Layout } from "../../App/Layout";
import { LoginForm } from "./LoginForm";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { loginData } = useAuth();
  const navigate = useNavigate();

  if (loginData) {
    navigate("/minside");
  }
  return (
    <Layout title="Login" description="Side til login">
      <section>
        <h2>Login</h2>
        <LoginForm />
      </section>
    </Layout>
  );
};

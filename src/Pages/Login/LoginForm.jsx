import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import { useAuth } from "../../App/Auth";
import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Destructer vars fra useAuth
  const { loginData, setLoginData } = useAuth();

  //fejlmeddelelse
  const [message, setMessage] = useState("");

  // Definerer funktion til at kalde api med form data
  const sendLoginRequest = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const result = await axios.post(
        "https://api.mediehuset.net/token",
        formData
      );
      //console.log(result);
      handleSessionData(result.data);
    } catch (error) {
      setMessage("Kunne ikke logge ind");
    }
  };

  // Definerer funktion til at håndtere form data til session storage
  const handleSessionData = (data) => {
    if (data) {
      sessionStorage.setItem("token", JSON.stringify(data));
      setLoginData(data);
    }
  };

  // Definerer funktion til log out
  const logOut = () => {
    sessionStorage.removeItem("token");
    setLoginData("");
  };

  return (
    <>
      {!loginData && !loginData.username ? (
        <form
          onSubmit={handleSubmit(sendLoginRequest)}
          className={styles.loginform}
        >
          <input
            type="text"
            id="username"
            placeholder={"Brugernavn"}
            {...register("username", { required: true })}
          />

          {/* Vis hvis der er en fejl */}
          {errors.username && <span>Du skal indtaste dit brugernavn!</span>}

          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            placeholder={"Adgangskode"}
          />

          {/* Vis meddelelse hvis der er en fejl */}
          {errors.password && <span>Du skal indtaste din adgangskode!</span>}

          {/* fejl message */}
          {message && <span>{message}</span>}

          <div className={styles.buttons}>
            <button>LOGIN</button>
          </div>
        </form>
      ) : (
        // Vis logindata hvis bruger er logget ind
        <div className={styles.loginfeedback}>
          <p>Du er logget ind som {loginData.username}</p>
          <button onClick={logOut}>LOG UD</button>
        </div>
      )}
    </>
  );
};

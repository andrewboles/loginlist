import styles from "../styles/Login.module.css";
import { useForm } from "react-hook-form";
import { useUser } from "../hooks/useUser";
import { Righteous, Asap } from "@next/font/google";
import { Icon } from "@iconify/react";
import axios from "axios";

const righteous = Righteous({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const asap = Asap({ weight: "400", style: "normal", subsets: ["latin"] });

const Login = () => {
  const { setUserContext } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
        { email: data.email, password: data.password }
      );
      console.log(response.data);
      setUserContext((current) => {
        return { ...current, user: response.data.user_username };
      });
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem("user", JSON.stringify({ email: data.email }));
    setUserContext((current) => {
      return { ...current, user: data.email };
    });
  };

  return (
    <div className={styles.loginSection}>
      <h2 className={`${righteous.className} ${styles.logoText}`}>
        rapptr labs
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.inputWrapper}>
          <Icon icon="bi:person-fill" className={styles.icon} />
          <input
            placeholder="user@rapptrlabs.com"
            {...register("email", {
              required: true,
              maxLength: 50,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            className={
              errors.email
                ? `${styles.textInput} ${styles.inputError} ${asap.className}`
                : `${styles.textInput} ${asap.className}`
            }
          />
        </div>
        {errors.email && (
          <span className={styles.errorText}>{errors.email.message}</span>
        )}
        <div className={styles.inputWrapper}>
          <Icon icon="bxs:lock-alt" className={styles.icon} />
          <input
            placeholder="Must be at least 4 chars"
            type="password"
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 16,
            })}
            className={
              errors.password
                ? `${styles.textInput} ${styles.inputError} ${asap.className}`
                : `${styles.textInput} ${asap.className}`
            }
          />
        </div>
        {errors.password && (
          <span className={styles.errorText}>
            Must be at least 4 characters
          </span>
        )}
        <button
          type="submit"
          className={
            isValid
              ? `${styles.submitButton} ${asap.className}`
              : `${styles.submitButton} ${asap.className} ${styles.disabledButton}`
          }
          disabled={!isValid || isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

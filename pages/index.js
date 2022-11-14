import styles from "../styles/Home.module.css";
import List from "../components/List";
import Login from "../components/Login";
import StockButton from "../components/StockButton";
import { useUser } from "../hooks/useUser";

export default function Home() {
  const { user, logout } = useUser();

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.listContainer}>
          {typeof window === "undefined" ? null : (
            <List items={JSON.parse(localStorage.getItem(`${user}-todos`)) ?? []} {...{user}} />
          )}
          <StockButton className={styles.logoutButton} onClick={logout}>
            Logout
          </StockButton>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

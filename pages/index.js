import styles from "../styles/Home.module.css";
import List from "../components/List";
import Login from "../components/Login";
import StockButton from "../components/StockButton";
import { useUser } from "../hooks/useUser";
import Head from 'next/head'

export default function Home() {
  const { user, logout } = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>My To-do List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user ? (
        <div className={styles.listContainer}>
          {typeof window === "undefined" ? null : (
            <List items={JSON.parse(localStorage.getItem(`${user.user_username}-todos`)) ?? []} {...{user}} />
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

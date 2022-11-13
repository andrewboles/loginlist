import styles from '../styles/Home.module.css'
import List from '../components/List'
import Login from '../components/Login'
import StockButton from '../components/StockButton'
import { useUser } from '../hooks/useUser'

let dummyItems = [
  {
    id: "4n5pxq24kriob12ogd",
    text: "Do my taxes"
  },
  {
    id: "4n5pxq24ksiob12ogl",
    text: "Workout"
  },
  {
    id: "4n5pxq24kmgob12ogl",
    text: "Go Shopping"
  }
]

export default function Home() {
  const { user, logout } = useUser()
  
  return (
      <div className={styles.container}>
        {!user ? <div className={styles.listContainer}><List items={typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('todos')) : []} /><StockButton className={styles.logoutButton} onClick={logout}>Logout</StockButton></div> : <Login/>}
      </div>
  )
}

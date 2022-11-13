import styles from '../styles/StockButton.module.css'
import { Asap } from "@next/font/google";

const asap = Asap({ weight: "500", style: "normal", subsets: ["latin"] });

const StockButton = ({onClick, children, className}) => {
  
  return (
    <button onClick={onClick} className={`${styles.stockButton} ${asap.className} ${className} `}>{children}</button>
  )
}

export default StockButton
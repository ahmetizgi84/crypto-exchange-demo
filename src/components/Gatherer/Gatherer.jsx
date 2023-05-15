import { Spinner } from "react-activity";
import styles from "./Gatherer.module.css";
import cn from "classnames";
// import WYNX from "../../assets/icons/wynx.png";
import HEBYS from "../../assets/icons/hebys.png";

const Gatherer = () => {
  return (
    <div className={cn([styles.container, "vh-100 d-flex justify-content-center text-center"])}>
      <div className={styles.mySpinnerContainer}>
        <Spinner size={44} color="#d4005c" />
        <img src={HEBYS} className={styles.logo} alt="woynex_spinner" />
        <div>Gathering...</div>
      </div>
    </div>
  );
};

export default Gatherer;

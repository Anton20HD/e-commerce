import Image from "next/image";
import styles from "./page.module.scss";
import StartPage from "./components/startPage/page";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
          <StartPage/>
      </main>
    </>
  );
}

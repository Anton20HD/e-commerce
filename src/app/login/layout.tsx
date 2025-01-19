
import styles from "@/app/login/page.module.scss"

export const metadata = {
    title: "Login | GymBeast",
    description: "Login to your GymBeast account.",
  };
  
  export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className={styles.loginLayout}>
        {children}
      </div>
    );
  }
  
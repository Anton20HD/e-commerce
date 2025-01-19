
import styles from "@/app/register/page.module.scss"

export const metadata = {
    title: "Register | GymBeast",
    description: "Registere to create your GymBeast account.",
  };
  
  export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className={styles.registerLayout}>
        {children}
      </div>
    );
  }
  
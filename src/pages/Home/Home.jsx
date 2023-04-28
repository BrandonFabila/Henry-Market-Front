import React from "react";
import styles from "./Home.module.css";
import Products from "../../components/Products/Products";


function Home() {

  return (
    <>
      <section className={styles.section}>
          <div className={styles.cards}>
            <div className={styles.content_cards}>
                <Products/>
            </div>
          </div>
      </section>
    </>
  );
}

export default Home;
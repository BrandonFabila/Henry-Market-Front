import React from "react";
import Products from "../../components/Products/Products";
import SideBar from '../../components/SideBar/SideBar'
import s from "./Home.module.css";


function Home() {

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      
      <div className={s.products}>
        <Products />
      </div>
    </div>
  );
}

export default Home;
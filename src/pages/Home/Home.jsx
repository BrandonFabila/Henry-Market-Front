import Products from "../../components/Products/Products";
import SideBar from '../../components/SideBar/SideBar'
import s from "./Home.module.css";
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { getProductFiltered } from "../../store/actions/index";
import { useParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const {id_categoria_producto} = useParams()
  
 useEffect(() => {
     dispatch(getProductFiltered(id_categoria_producto));
   }, [dispatch, id_categoria_producto]);
 
   const { productsFitered } = useSelector(state => state);
   console.log("nonono este este", productsFitered)
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
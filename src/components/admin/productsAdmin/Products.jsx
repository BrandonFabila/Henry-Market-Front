import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
//import Cookies from "js-cookie";
import { useEffect } from "react";
import { getAllProducts } from "../../../store/actions/index";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";


const Products = () => {
  const products = useSelector((state) => state.products) ?? [];

  const dispatch = useDispatch();


  //console.log(session);
  useEffect(() => {
    dispatch(getAllProducts());
  
    const handleBeforeUnload = () => {
      window.location.reload();
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //let values = JSON.parse(session);

 // let comercio = values.dataValues;
 // console.log(comercio);


 
 

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th style={{padding: '0.5rem'}}> Stock </th>
            <th>Editar o eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            if(p.estado)
            return (
              <>
                <tr key={p.id_producto}>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion_producto}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Link to={`/product/${p.id_producto}`}>
                      <FiEdit size={22} color='var(--green-color)' className={styles.edit} style={{ margin: '5px 0px' }} />
                    </Link>
                  </td>
                </tr>
                <hr style={{ width: '520%' } } />
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Products;
import { MdSearch } from "react-icons/md";
import s from './search.module.css'
import { useDispatch } from "react-redux";
import React,{ useState} from "react";
import { getProductByName } from "../../../store/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(input));
    navigate('/products/categoria/:id_categoria_producto');
  }

    return (
        <form onSubmit={handleSubmit}>
        <div className={s.container}>
            <input type="text" 
            onChange={(e) => setInput(e.target.value)}
            className={s.input} 
            placeholder='Encuentra el producto que buscas'/>
            <button className={s.button}><MdSearch size={28} fill='gray'/></button>
        </div>
        </form>
    )
}
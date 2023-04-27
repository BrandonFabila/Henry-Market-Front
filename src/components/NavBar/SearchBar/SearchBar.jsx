import { MdSearch } from "react-icons/md";
import s from './search.module.css'

export default function SearchBar() {
    return (
        <div className={s.container}>
            <input type="text" className={s.input} placeholder='Encuentra el producto que buscas'/>
            <button className={s.button}><MdSearch size={28} fill='gray'/></button>
        </div>
    )
}
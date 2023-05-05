import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from "./CardReviews.module.css"

function CardReview({descripcion_motivo, valor_calificacion}) {
    const maxStars = 5;
    const filledStars = Math.round(valor_calificacion);
    
    const starList = Array(maxStars).fill().map((_, index) => {
      if (index < filledStars) {
        return <FaStar key={index} />;
      } else {
        return <FaRegStar key={index} />;
      }
    });
    
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.star}>
            {starList}
          </div>

          <div style={{marginBottom: "20px"}}>
            <p className={styles.texto}>{descripcion_motivo}</p>
          </div>
          <hr />
        </div>
      </div>
    );
  }
  
export default CardReview 

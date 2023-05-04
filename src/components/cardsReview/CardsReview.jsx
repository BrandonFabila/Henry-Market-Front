import CardReview from "../cardReviews/CardReviews"
import { useSelector } from "react-redux"
function CardsReviews(){
 const {reviews} = useSelector((state)=> state)
 console.log(reviews);
    return(
    <div>
        <div style={{display:"flex", justifyContent:"flex-start", margin:"20px"}}>
            <h2>Opiniones acerca del producto</h2>
        </div>
        <hr />
    {reviews.length?(
        reviews?.map(review => {
            return ( 
                <CardReview 
                id_motivo_calificacion={review.id_motivo_calificacion}
                descripcion_motivo={review.descripcion_motivo}
                valor_calificacion={review.valor_calificacion}
                id_producto={review.id_producto}
                />
            )
        })): (
                <div style={{margin: "100px"}}>
                    <p style={{fontSize:"1.5rem"}}>Este producto no tiene opiniones aun</p>
                </div>
                )
    }
    </div>
    )
}
export default CardsReviews
//helow
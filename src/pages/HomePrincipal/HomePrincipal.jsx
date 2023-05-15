import React from "react";
import CardsCategory from "../../components/cardsCategory/CardsCategory";
import Carousel from "../../components/carousel/Carousel"
function HomePrincipal() {
  return (
    <div style={{ minHeight: '100vh', marginTop: '80px' }}>
      <div style={{ width: '100%', height: '200px', backgroundSize: 'contain', backgroundPosition: 'center center', backgroundImage: 'url(https://media.c5n.com/p/dd1ab90df540a116957afb94da9be581/adjuntos/326/imagenes/000/187/0000187499/790x0/smart/hot-sale-2023.jpg)', backgroundRepeat: 'repeat' }}>
      </div>
      <Carousel numSlides={5} speed={2000} />
      <hr style={{ width: '85%', margin: '20px auto' }} />
      <div>
        <h1 style={{ textAlign: 'left', marginLeft: '80px' }}>Explora por categorías</h1>
        <CardsCategory />
      </div>
    </div>
  );
}

export default HomePrincipal;

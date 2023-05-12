import React from "react";
import CardsCategory from "../../components/cardsCategory/CardsCategory";
import Carousel from "../../components/carousel/Carousel"
function HomePrincipal() {
  return (
    <div style={{ minHeight: '100vh' }}>
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

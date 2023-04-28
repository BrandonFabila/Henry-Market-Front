import React from "react";
import CardsCategory from "../../components/cardsCategory/CardsCategory";

function HomePrincipal() {
  return (
      <div style={{paddingTop: "50px"}}>
        <h1 style={{textAlign: 'left', marginLeft: '80px' }}>Explora por categorías</h1>
      <CardsCategory />
      </div>
  );
}

export default HomePrincipal;

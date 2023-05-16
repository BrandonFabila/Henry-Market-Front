import { useSelector, useDispatch } from 'react-redux';
import CardOfert from '../cardOfert/CardOfert';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { getAllProducts } from "../../store/actions/index";
import { useMediaQuery } from 'react-responsive';

export default function Carousel({ numSlides, speed }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 570 }); // Verifica si la pantalla es menor a 450px de ancho
  const isTwoMobile = useMediaQuery({ maxWidth: 800 }); // Verifica si la pantalla es menor a 700px de ancho
  const isTreeMobile = useMediaQuery({ maxWidth: 1070 }); // Verifica si la pantalla es menor a 700px de ancho
  const isFourMobile = useMediaQuery({ maxWidth: 1500 }); // Verifica si la pantalla es menor a 700px de ancho
  const [slidesToShow, setSlidesToShow] = useState(numSlides || 5);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(state => state.products);

  useEffect(() => {
    // Actualiza la cantidad de elementos a mostrar en el Carousel según el tamaño de la pantalla
    if (isMobile) {
      setSlidesToShow(1);
    } else if (isTwoMobile) {
      setSlidesToShow(2);
    } else if (isTreeMobile) {
      setSlidesToShow(3);
    } else if (isFourMobile) {
      setSlidesToShow(4);
    } else {
      setSlidesToShow(numSlides || 5);
    }
  }, [isMobile, isTwoMobile, isTreeMobile, isFourMobile, numSlides]);

  const renderSlides = () => {
    const productosConDescuento = products.filter(producto => producto.valor_descuento && producto.estado);
    return productosConDescuento.map(p => (
      <CardOfert key={p.id_producto} id={p.id_producto} imagen={p.imagen} nombre={p.nombre} valor={p.valor} valor_descuento={p.valor_descuento} />
    ));
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>¡Mira las ofertas destacadas!</h1>
      <Slider
        dots={false}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={speed || 2000}
      >
        {renderSlides()}
      </Slider>
    </div>
  );
}

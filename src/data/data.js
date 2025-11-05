// src/data/data.js
import arnes from '../assets/placeholder/arnes.jpg';
import cama from '../assets/placeholder/cama.jpg';
import casagato from '../assets/placeholder/casagato.jpg';
import collar from '../assets/placeholder/collar.jpg';
import comidagato from '../assets/placeholder/comidagato.jpg';
import correa from '../assets/placeholder/correa.jpg';
import juguete from '../assets/placeholder/juguete.jpg';
import plato from '../assets/placeholder/plato.jpg';
import shampoo from '../assets/placeholder/shampo.jpg';

export const productos = [
  {
    id: 1,
    nombre: "Arnés para perro",
    precio: 12990,
    descripcion: "Arnés cómodo y ajustable con diseño clásico.",
    categoria: "Accesorios",
    oferta: false,
    imagen: arnes
  },
  {
    id: 2,
    nombre: "Cama acolchada para perro",
    precio: 34990,
    descripcion: "Cama ultrasuave con textura tipo waffle.",
    categoria: "Accesorios",
    oferta: true,
    imagen: cama
  },
  {
    id: 3,
    nombre: "Rascador y torre para gatos",
    precio: 65990,
    descripcion: "Centro de juegos con varias plataformas.",
    categoria: "Juguetes",
    oferta: false,
    imagen: casagato
  },
  {
    id: 4,
    nombre: "Collar tropical para perro",
    precio: 8990,
    descripcion: "Collar resistente con estampado tropical.",
    categoria: "Accesorios",
    oferta: false,
    imagen: collar
  },
  {
    id: 5,
    nombre: "Alimento para gato Pro Plan",
    precio: 28990,
    descripcion: "Nutrición completa con prebióticos naturales.",
    categoria: "Alimentos",
    oferta: true,
    imagen: comidagato
  },
  {
    id: 6,
    nombre: "Correa retráctil automática",
    precio: 10990,
    descripcion: "Correa extensible hasta 3 metros.",
    categoria: "Accesorios",
    oferta: false,
    imagen: correa
  },
  {
    id: 7,
    nombre: "Juguetes dentales para perro (pack x4)",
    precio: 9990,
    descripcion: "Pack de juguetes de goma con texturas.",
    categoria: "Juguetes",
    oferta: true,
    imagen: juguete
  },
  {
    id: 8,
    nombre: "Plato doble elevado para mascota",
    precio: 14990,
    descripcion: "Plato doble de cerámica con base de madera.",
    categoria: "Accesorios",
    oferta: false,
    imagen: plato
  },
  {
    id: 9,
    nombre: "Shampoo para perros con ceramidas",
    precio: 8490,
    descripcion: "Shampoo hipoalergénico para brillo y suavidad.",
    categoria: "Higiene",
    oferta: true,
    imagen: shampoo
  }
];

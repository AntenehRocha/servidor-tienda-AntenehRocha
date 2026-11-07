document.addEventListener("DOMContentLoaded", () => {
  const productosSeed = [
    {
      nombre: "Portátil Gaming ASUS ROG Strix",
      imagen:
        "https://dlcdnwebimgs.asus.com/gain/0C906310-BF66-458A-A9BA-F7106106F1FA",
      descripcion:
        "Pantalla de 16 pulgadas, procesador Intel Core i7 de última generación, 16GB de RAM y tarjeta gráfica RTX 4060. Ideal para gaming avanzado y diseño profesional.",
      stock: 7,
    },
    {
      nombre: "Teclado Mecánico RGB Pro",
      imagen:
        "https://www.meetion.com/lifisher-m4425/1760079416269-5/png80-t3-scale100.webp",
      descripcion:
        "Teclado mecánico con interruptores (switches) mecánicos azules, retroiluminación RGB totalmente configurable y estructura de aluminio de alta resistencia.",
      stock: 26,
    },
    {
      nombre: "Ratón Ergonómico Inalámbrico",
      imagen:
        "https://d1gb7gicmr8iau.cloudfront.net/fit-in/3840x2880/Media/Images/Product/Visual/26107_pictures_product_visual_1.png",
      descripcion:
        "Conexión 2.4GHz y Bluetooth. Diseño ergonómico vertical para evitar la fatiga en la muñeca y batería recargable de larga duración.",
      stock: 2,
    },
    {
      nombre: 'Monitor Curvo 27" 4K',
      imagen:
        "https://images.samsung.com/is/image/samsung/es-c27r500-lc27r500fhuxen-frontblack-159445837?$1164_776_PNG$",
      descripcion:
        "Resolución Ultra HD 4K, panel IPS con colores vivos y curvatura 1500R para una inmersión completa. Tasa de refresco de 144Hz.",
      stock: 12,
    },
    {
      nombre: "Auriculares Inalámbricos Noise Cancelling",
      imagen:
        "https://sony.scene7.com/is/image/sonyglobalsolutions/Product-Intro-7-M-7?$productIntroPlatemobile$&fmt=png-alpha",
      descripcion:
        "Cancelación activa de ruido (ANC), audio de alta resolución y almohadillas viscoelásticas ultra cómodas. Hasta 30 horas de autonomía.",
      stock: 89,
    },
    {
      nombre: "Disco Duro SSD Externo 1TB",
      imagen:
        "https://media.lifeinformatica.com/contents/assets/HESAN029/imgs/SDSSDE30-1T00-G26-01.png",
      descripcion:
        "Unidad de estado sólido ultraportátil con conexión USB-C 3.2. Velocidades de transferencia de hasta 1050 MB/s con carcasa resistente a caídas.",
      stock: 45,
    },
    {
      nombre: "Memoria RAM DDR5 32GB Kit",
      imagen:
        "https://www.powerplanetonline.com/cdnassets/products/102197/crucial-32gb-kit-16gbx2-ddr5-5600-sodimm-memori-ram-para-ordenador-mini-pc_1_l.webp",
      descripcion:
        "Kit de dos módulos de 16GB (32GB en total) a una frecuencia de 6000MHz. Equipado con disipador térmico de aluminio de perfil bajo.",
      stock: 4,
    },
  ];

  const seedProductos = new FormData();

  const JSONseed = JSON.stringify(productosSeed);

  seedProductos.append("seedProductos", JSONseed);

  fetch("./../php/mostrar-productos.php", {
    method: "POST",
    body: seedProductos,
  })
    .then((res) => res.json())
    .then((datos) => {
      if (datos.estado === "correcto") {
        const avisosDOM = document.querySelector("#avisosDOM");
        if (avisosDOM) {
          avisosDOM.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
        }
      } else {
        const avisosDOM = document.querySelector("#avisosDOM");
        avisosDOM.innerHTML = `<div class="alert alert-warning" role="alert"> ${datos.mensaje} </div>`;
        console.warn("Respuesta del servidor:", datos.mensaje);
      }
    });
});

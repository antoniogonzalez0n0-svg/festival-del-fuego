
/* Festival del Fuego — demo navegable sin cobros reales. */

const $ = s => document.querySelector(s);

const money = n => new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0
}).format(n);

const tiers = {
  general: {
    name: 'Acceso General',
    prices: [3500, 3800, 4200],
    desc: 'La esencia del festival: gastronomía, música y fuego.',
    benefits: [
      '8 degustaciones',
      '1 plato fuerte',
      '2 bebidas sin alcohol',
      'Talleres y música en vivo',
      'Estacionamiento incluido'
    ]
  },
  vip: {
    name: 'Acceso VIP',
    prices: [4500, 4800, 5200],
    desc: 'Una forma especial de disfrutar el Festival del Fuego.',
    benefits: [
      'Beneficios base del Acceso General',
      'Amenidades VIP por confirmar',
      'Cupo sujeto a disponibilidad'
    ]
  },
  weekend: {
    name: 'Brasa Weekend',
    prices: [10000, 10000, 10000],
    desc: 'Tres días de festival y dos noches de hospedaje.',
    benefits: [
      'Acceso a los 3 días del festival',
      '2 noches con cama asignada',
      'Transporte por cuenta del asistente',
      'Hospedaje y cupo sujetos a confirmación'
    ]
  }
};

const days = ['Día 1', 'Día 2', 'Día 3'];

const images = {
  grill: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
  chef: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85',
  music: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85',
  food: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85',
  nature: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85'
};

let cart = {
  tier: 'general',
  day: 0,
  qty: 1
};

let toastTimer;

/* COMPONENTES */

const head = (crumb, title, sub) => `
  <div class="page-hero">
    <div class="container">
      <div class="crumb">${crumb}</div>
      <h1>${title}</h1>
      <p>${sub}</p>
    </div>
  </div>
`;

const sectionTitle = (k, title, desc) => `
  <div class="section-head">
    <span class="eyebrow">${k}</span>
    <h2>${title}</h2>
    <p>${desc}</p>
  </div>
`;

const link = (label, href, style = 'btn-primary') => `
  <a class="btn ${style}" href="${href}">
    ${label} <span>↗</span>
  </a>
`;

const ticketCard = id => {
  let t = tiers[id];

  return `
    <article class="ticket ${id === 'vip' ? 'featured' : ''}">

      ${id === 'vip' ? '<span class="tag">EXPERIENCIA ESPECIAL</span>' : ''}

      <span class="eyebrow">
        ${id === 'weekend' ? '3 DÍAS · 2 NOCHES' : 'ACCESO POR DÍA'}
      </span>

      <h3>${t.name}</h3>
      <p class="muted">${t.desc}</p>

      <div class="price">
        ${money(t.prices[0])}
        <small>
          / persona${id === 'weekend' ? ' · paquete' : ''}
        </small>
      </div>

      <ul>
        ${t.benefits.map(x => `<li>${x}</li>`).join('')}
      </ul>

      ${link('SELECCIONAR ACCESO', '#comprar/' + id)}

    </article>
  `;
};

const feature = (emoji, title, desc, img) => `
  <article class="feature">
    <img src="${img}" alt="${title}" loading="lazy">
    <div class="feature-body">
      <div class="feature-icon">${emoji}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  </article>
`;

/* PÁGINA INICIO */

const home = () => `
  <section class="hero">
    <div class="hero-inner">

      <span class="eyebrow">
        ✦ HUASCA DE OCAMPO · HIDALGO · MÉXICO
      </span>

      <h1>
        EL FUEGO<br>
        TIENE UN <em>SABOR.</em>
      </h1>

      <p class="subtitle">
        Festival del Fuego · El Sabor de la Brasa
      </p>

      <p class="hero-desc">
        Una celebración extraordinaria de la cocina a las brasas,
        la música, la naturaleza y los momentos que merecen
        recordarse.
      </p>

      <div class="hero-actions">
        ${link('CONOCER EL FESTIVAL', '#festival')}
        ${link('DESCUBRIR BOLETOS', '#boletos', 'btn-outline')}
      </div>

      <div class="hero-bottom">
        <span>✦ 3 DÍAS DE EXPERIENCIA</span>
        <span>✦ COCINA AL FUEGO</span>
        <span>✦ HUASCA DE OCAMPO</span>
      </div>

    </div>
  </section>

  <div class="stats">

    <div class="stat">
      <strong>3</strong>
      <span>Días de celebración</span>
    </div>

    <div class="stat">
      <strong>15</strong>
      <span>Expositores proyectados</span>
    </div>

    <div class="stat">
      <strong>∞</strong>
      <span>Momentos memorables</span>
    </div>

  </div>

  <section class="section">
    <div class="container split">

      <div>
        ${sectionTitle(
          'NUESTRA ESENCIA',
          'NO ES SOLO COMIDA.<br><em>ES UN RITUAL.</em>',
          'Un encuentro entre la tradición de cocinar al fuego y una experiencia contemporánea de hospitalidad.'
        )}

        <p class="lead">
          El aroma de la leña, la técnica de los parrilleros
          y el paisaje de Hidalgo se unen para crear algo inolvidable.
        </p>

        ${link('CONOCE NUESTRA HISTORIA', '#festival')}
      </div>

      <div
        class="photo photo-fire"
        role="img"
        aria-label="Cocina a la brasa"
      ></div>

    </div>
  </section>

  <section class="section surface">
    <div class="container">

      ${sectionTitle(
        'VIVE EL MOMENTO',
        'EXPERIENCIAS QUE <em>ENCIENDEN.</em>',
        'Sabores, demostraciones y entretenimiento en un solo lugar.'
      )}

      <div class="grid3">
        ${feature(
          '🥩',
          'Cocina a la brasa',
          'Preparaciones al fuego y sabores extraordinarios.',
          images.grill
        )}

        ${feature(
          '👨‍🍳',
          'Cocina en vivo',
          'Descubre técnicas de los especialistas.',
          images.chef
        )}

        ${feature(
          '🎶',
          'Música y ambiente',
          'El escenario perfecto para compartir.',
          images.music
        )}
      </div>

      <p style="margin-top:30px">
        ${link('EXPLORAR EXPERIENCIAS', '#experiencias', 'btn-outline')}
      </p>

    </div>
  </section>

  <section class="section">
    <div class="container">

      ${sectionTitle(
        'ELIGE TU EXPERIENCIA',
        'TU ENTRADA AL <em>FUEGO.</em>',
        'Opciones diseñadas para diferentes formas de disfrutar el festival.'
      )}

      <div class="grid3">
        ${Object.keys(tiers).map(ticketCard).join('')}
      </div>

      <p class="muted" style="margin-top:22px">
        Precios de referencia del proyecto. Fecha, beneficios
        y disponibilidad pendientes de confirmación.
      </p>

    </div>
  </section>
`;

/* PÁGINA EL FESTIVAL */

const festival = () =>
  head(
    'INICIO / EL FESTIVAL',
    'DONDE NACE <em>LA BRASA.</em>',
    'La gastronomía se convierte en un espectáculo para todos los sentidos.'
  ) + `
  <section class="section">
    <div class="container split">

      <div>
        <span class="eyebrow">EL CONCEPTO</span>

        <h2>
          FUEGO, SABOR Y <em>TRADICIÓN.</em>
        </h2>

        <p class="lead">
          Festival del Fuego: El Sabor de la Brasa es una propuesta
          de evento gastronómico prémium en Huasca de Ocampo, Hidalgo.
        </p>

        <p class="muted">
          Durante tres días, buscamos reunir propuestas culinarias,
          demostraciones, entretenimiento y espacios para convivir.
          La meta es que cada visitante sienta que su experiencia
          vale lo que cuesta y quiera regresar.
        </p>

        ${link('EXPLORAR EXPERIENCIAS', '#experiencias')}
      </div>

      <div
        class="photo photo-land"
        role="img"
        aria-label="Paisaje natural"
      ></div>

    </div>
  </section>

  <section class="section surface">
    <div class="container">

      ${sectionTitle(
        'EL EVENTO',
        'LO QUE NOS <em>MUEVE.</em>',
        'Una propuesta que combina calidad, operación responsable y momentos memorables.'
      )}

      <div class="grid3">

        <div class="mini-card">
          <h3>01 · Sabor</h3>
          <p>
            La cocina al fuego como protagonista de cada encuentro.
          </p>
        </div>

        <div class="mini-card">
          <h3>02 · Experiencia</h3>
          <p>
            Gastronomía, música y espacios para disfrutar con calma.
          </p>
        </div>

        <div class="mini-card">
          <h3>03 · Hospitalidad</h3>
          <p>
            Un festival organizado para cuidar al visitante
            y su experiencia.
          </p>
        </div>

      </div>
    </div>
  </section>
`;

/* PÁGINA EXPERIENCIAS */

const experiences = () =>
  head(
    'INICIO / EXPERIENCIAS',
    'VIVE EL <em>FUEGO.</em>',
    'Mucho más que un festival gastronómico: un viaje por los sentidos.'
  ) + `
  <section class="section">
    <div class="container">

      <div class="grid2">

        ${feature(
          '🥩',
          'Experiencia a la brasa',
          'Preparaciones y técnicas que celebran el poder del fuego.',
          images.grill
        )}

        ${feature(
          '👨‍🍳',
          'Cocina en vivo',
          'Observa a especialistas preparar platillos y compartir sus técnicas.',
          images.chef
        )}

        ${feature(
          '🎶',
          'Música y entretenimiento',
          'Un ambiente pensado para acompañar la experiencia gastronómica.',
          images.music
        )}

        ${feature(
          '🌲',
          'Naturaleza y convivencia',
          'Disfruta del entorno de Huasca de Ocampo con tus acompañantes.',
          images.nature
        )}

      </div>

      <p style="margin-top:35px">
        ${link('ENCUENTRA TU BOLETO', '#boletos')}
      </p>

    </div>
  </section>
`;

/* PÁGINA GASTRONOMÍA */

const gastronomy = () =>
  head(
    'INICIO / GASTRONOMÍA',
    'EL ARTE DE <em>LA BRASA.</em>',
    'Una selección de sabores donde el fuego es el ingrediente esencial.'
  ) + `
  <section class="section">
    <div class="container split">

      <div>
        <span class="eyebrow">
          EL MENÚ DE LA EXPERIENCIA
        </span>

        <h2>
          CADA BOCADO <em>CUENTA.</em>
        </h2>

        <p class="lead">
          Nuestra propuesta gastronómica combina degustaciones,
          platillos principales y demostraciones culinarias.
        </p>

        <ul class="checklist">
          <li>8 degustaciones incluidas en el acceso base propuesto</li>
          <li>1 plato fuerte</li>
          <li>2 bebidas sin alcohol</li>
          <li>Posibilidad de comprar alimentos adicionales</li>
        </ul>

        <div class="notice">
          Los expositores, platillos y menús definitivos
          están sujetos a confirmación.
        </div>

        <p style="margin-top:28px">
          ${link('CONSULTAR ACCESOS', '#boletos')}
        </p>
      </div>

      <div class="photo photo-fire"></div>

    </div>
  </section>

  <section class="section surface">
    <div class="container">

      ${sectionTitle(
        'UNA EXPERIENCIA COMPLETA',
        'MÁS QUE UN <em>MENÚ.</em>',
        'Cada detalle busca crear una experiencia auténtica y memorable.'
      )}

      <div class="grid3">

        <div class="mini-card">
          <h3>🔥 Técnicas al fuego</h3>
          <p>Parrilla, brasa y cocción tradicional.</p>
        </div>

        <div class="mini-card">
          <h3>🥩 Degustaciones</h3>
          <p>Sabores variados incluidos en la propuesta base.</p>
        </div>

        <div class="mini-card">
          <h3>💳 Compras adicionales</h3>
          <p>
            Monedero digital demostrativo para consumos
            dentro del festival.
          </p>
        </div>

      </div>
    </div>
  </section>
`;

/* PÁGINA BOLETOS */

const tickets = () =>
  head(
    'INICIO / BOLETOS',
    'ELIGE CÓMO <em>VIVIRLO.</em>',
    'Selecciona tu experiencia. Los precios son propuestas del proyecto y la compra es una demostración.'
  ) + `
  <section class="section">
    <div class="container">

      <div class="grid3">
        ${Object.keys(tiers).map(ticketCard).join('')}
      </div>

      <div class="notice" style="margin-top:30px">
        General y VIP tienen precios proyectados por día:
        General $3,500 / $3,800 / $4,200;
        VIP $4,500 / $4,800 / $5,200.
        Brasa Weekend cuesta $10,000 por persona e incluye
        la propuesta de 3 días y 2 noches.
        El calendario definitivo aún no se confirma.
      </div>

      <div class="faq" style="margin-top:55px">

        <h2>
          PREGUNTAS <em>FRECUENTES.</em>
        </h2>

        <details>
          <summary>¿Puedo comprar boletos desde aquí?</summary>
          <p>
            Este sitio es una demostración académica.
            Puedes simular una compra, pero no se procesan
            pagos ni se emiten boletos válidos.
          </p>
        </details>

        <details>
          <summary>¿Qué incluye el acceso General?</summary>
          <p>
            La propuesta contempla 8 degustaciones,
            un plato fuerte, dos bebidas sin alcohol,
            talleres, música y estacionamiento.
          </p>
        </details>

        <details>
          <summary>¿Qué incluye el acceso VIP?</summary>
          <p>
            Incluye la propuesta base; los beneficios adicionales
            VIP aún deben confirmarse y presupuestarse.
          </p>
        </details>

        <details>
          <summary>¿Cuándo será el festival?</summary>
          <p>
            Las fechas de la próxima edición están por confirmar.
            Los días 1, 2 y 3 se usan como referencias
            para esta demostración.
          </p>
        </details>

      </div>
    </div>
  </section>
`;

/* PÁGINA MONEDERO */

const wallet = () =>
  head(
    'INICIO / MONEDERO',
    'RECARGA TU <em>EXPERIENCIA.</em>',
    'Solicita saldo para tu futura pulsera o aplicación del festival.'
  ) + `
  <section class="section">
    <div class="container split">

      <div>

        <span class="eyebrow">
          RECARGAS DESDE LA WEB
        </span>

        <h2>
          TU SALDO, <em>LISTO PARA EL FUEGO.</em>
        </h2>

        <p class="lead">
          Desde esta página podrás preparar la recarga del
          monedero para consumos adicionales dentro del festival.
        </p>

        <ul class="checklist">
          <li>Recarga digital por tarjeta o transferencia SPEI</li>
          <li>
            Tarifa digital propuesta de $20 por operación,
            visible antes de confirmar
          </li>
          <li>
            Los alimentos incluidos en tu experiencia
            no requieren saldo adicional
          </li>
          <li>
            El consumo dentro del evento se realizará
            con pulsera o app, que diseñaremos después
          </li>
        </ul>

        <div class="notice">
          Demostración académica: no se procesa dinero,
          no se asigna saldo real y no se verifica
          ninguna transferencia bancaria.
        </div>

      </div>

      <div class="details">

        <span class="eyebrow">
          RECARGA EN LÍNEA · DEMOSTRACIÓN
        </span>

        <h3>Prepara tu recarga</h3>

        <div class="field">
          <label for="walletAmount">Importe a recargar</label>

          <select id="walletAmount">
            <option value="200">$200 MXN</option>
            <option value="500">$500 MXN</option>
            <option value="1000">$1,000 MXN</option>
            <option value="2000">$2,000 MXN</option>
          </select>
        </div>

        <div class="field">
          <label for="walletIdentifier">
            Correo del visitante (identificador provisional)
          </label>

          <input
            type="email"
            id="walletIdentifier"
            autocomplete="email"
            placeholder="visitante@correo.com"
            required
          >
        </div>

        <div class="summary-line">
          <span>Saldo solicitado</span>
          <b id="walletAmountText">$200 MXN</b>
        </div>

        <div class="summary-line">
          <span>Tarifa de recarga digital propuesta</span>
          <b>$20 MXN</b>
        </div>

        <div class="summary-total">
          <span>Total a pagar</span>
          <strong id="walletTotal">$220 MXN</strong>
        </div>

        <div class="divider"></div>

        <span class="eyebrow">MÉTODO DE PAGO</span>

        <div class="payment-choice">

          <label class="pay-option">
            <input
              type="radio"
              name="walletPayment"
              value="card"
              checked
            >
            <span>💳 Tarjeta de prueba</span>
          </label>

          <label class="pay-option">
            <input
              type="radio"
              name="walletPayment"
              value="spei"
            >
            <span>🏦 Transferencia SPEI demostrativa</span>
          </label>

        </div>

        <div id="walletPaymentInfo"></div>

        <label style="display:flex;gap:10px;align-items:start;font-size:.8rem;color:var(--muted);margin:20px 0">

          <input type="checkbox" id="walletAgree">

          Comprendo que esta recarga es ficticia
          y no entrega saldo real.
        </label>

        <button class="btn btn-primary btn-wide" id="walletAdd">
          CONFIRMAR RECARGA DE PRUEBA ↗
        </button>

        <p
          class="muted"
          id="walletMsg"
          role="status"
          style="margin-top:18px;font-size:.8rem"
        >
          No introduzcas datos bancarios reales.
        </p>

      </div>
    </div>
  </section>
`;

/* PÁGINA CONTACTO */

const contact = () =>
  head(
    'INICIO / CONTACTO',
    'HABLEMOS DEL <em>FUEGO.</em>',
    '¿Tienes dudas sobre el festival? Déjanos tu mensaje en esta demostración.'
  ) + `
  <section class="section">
    <div class="container contact-wrap">

      <form id="contactForm" class="details">

        <div class="form-grid">

          <div class="field">
            <label for="contactName">Nombre completo</label>
            <input
              id="contactName"
              required
              maxlength="80"
              autocomplete="name"
              placeholder="Tu nombre"
            >
          </div>

          <div class="field">
            <label for="contactEmail">Correo electrónico</label>
            <input
              id="contactEmail"
              type="email"
              required
              autocomplete="email"
              placeholder="correo@ejemplo.com"
            >
          </div>

        </div>

        <div class="field">
          <label for="contactSubject">Asunto</label>

          <select id="contactSubject" required>
            <option value="">Selecciona una opción</option>
            <option>Boletos</option>
            <option>Gastronomía</option>
            <option>Experiencias</option>
            <option>Patrocinios</option>
            <option>Otros</option>
          </select>
        </div>

        <div class="field">
          <label for="contactMessage">Mensaje</label>

          <textarea
            id="contactMessage"
            required
            maxlength="1000"
            placeholder="Cuéntanos cómo podemos ayudarte..."
          ></textarea>
        </div>

        <div class="notice" style="margin-bottom:20px">
          Este formulario demuestra la experiencia de contacto;
          no envía datos a un servidor ni a una dirección de correo.
        </div>

        <button class="btn btn-primary" type="submit">
          PROBAR FORMULARIO ↗
        </button>

      </form>
    </div>
  </section>
`;

/* PROCESO DE COMPRA */

function checkout(tier) {

  if (!tiers[tier]) tier = 'general';

  cart.tier = tier;
  cart.qty = 1;
  cart.day = 0;

  const t = tiers[tier];

  return head(
    'INICIO / BOLETOS / SIMULADOR',
    'PREPARA TU <em>EXPERIENCIA.</em>',
    'Personaliza tu acceso y explora una compra de demostración. No se realizan cargos reales.'
  ) + `
    <section class="section">
      <div class="container">

        <a href="#boletos" class="back">
          ← Volver a los accesos
        </a>

        <div class="checkout">

          <div>
            <div class="details">

              <span class="eyebrow">
                PASO 01 / TU ACCESO
              </span>

              <h3>${t.name}</h3>
              <p class="muted">${t.desc}</p>

              ${tier === 'weekend'
                ? '<p class="pill">Paquete completo · 3 días y 2 noches</p>'
                : `
                  <div class="field">
                    <label for="checkoutDay">
                      Selecciona el día (propuesta de calendario)
                    </label>

                    <select id="checkoutDay">
                      ${days.map((d,i) => `
                        <option value="${i}">
                          ${d} · ${money(t.prices[i])}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                `
              }

              <div class="field">

                <label>Cantidad de accesos (máximo 10)</label>

                <div class="stepper">
                  <button id="minusQty" aria-label="Quitar boleto">−</button>
                  <output id="qtyOutput">1</output>
                  <button id="plusQty" aria-label="Agregar boleto">+</button>
                </div>

              </div>

              <div class="divider"></div>

              <span class="eyebrow">
                PASO 02 / DATOS DEL VISITANTE
              </span>

              <div class="form-grid" style="margin-top:18px">

                <div class="field">
                  <label for="buyerName">Nombre</label>

                  <input
                    id="buyerName"
                    autocomplete="name"
                    maxlength="80"
                    placeholder="Nombre y apellido"
                    required
                  >
                </div>

                <div class="field">
                  <label for="buyerEmail">
                    Correo electrónico
                  </label>

                  <input
                    id="buyerEmail"
                    type="email"
                    autocomplete="email"
                    placeholder="correo@ejemplo.com"
                    required
                  >
                </div>

              </div>

              <div class="divider"></div>

              <span class="eyebrow">
                PASO 03 / MÉTODO DE PAGO
              </span>

              <div class="payment-choice">

                <label class="pay-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked
                  >
                  <span>💳 Tarjeta de crédito o débito</span>
                </label>

                <label class="pay-option">
                  <input
                    type="radio"
                    name="payment"
                    value="spei"
                  >
                  <span>🏦 Transferencia SPEI</span>
                </label>

              </div>

              <div id="paymentInfo"></div>

              <label style="display:flex;gap:10px;align-items:start;font-size:.8rem;color:var(--muted);margin:20px 0">

                <input type="checkbox" id="demoAgree">

                Entiendo que esta es una simulación académica,
                sin pagos ni boletos válidos.

              </label>

              <button
                id="checkoutSubmit"
                class="btn btn-primary btn-wide"
              >
                FINALIZAR SIMULACIÓN ↗
              </button>

            </div>
          </div>

          <aside class="summary">

            <span class="eyebrow">TU SELECCIÓN</span>
            <h3>RESUMEN DE COMPRA</h3>

            <div class="summary-line">
              <span>Experiencia</span>
              <b>${t.name}</b>
            </div>

            <div class="summary-line">
              <span>Accesos</span>
              <b id="sumQty">1</b>
            </div>

            <div class="summary-line">
              <span>Precio unitario</span>
              <b id="sumUnit">${money(t.prices[0])}</b>
            </div>

            <div class="summary-line">
              <span>Subtotal</span>
              <b id="sumSubtotal">${money(t.prices[0])}</b>
            </div>

            <div class="summary-line">
              <span>Tarifa de servicio ilustrativa</span>
              <b id="sumFee">$210</b>
            </div>

            <div class="summary-total">
              <span>TOTAL</span>
              <strong id="sumTotal">
                ${money(t.prices[0] + 210)}
              </strong>
            </div>

            <p class="muted" style="font-size:.77rem">
              La tarifa de servicio de $210 por acceso es un
              supuesto ilustrativo, no un cargo vigente.
              No se procesan pagos.
            </p>

            <span class="pill">
              MODO DEMOSTRACIÓN
            </span>

          </aside>

        </div>
      </div>
    </section>
  `;
}

/* INFORMACIÓN DE PAGO */

function payInfo() {

  const method =
    $('input[name="payment"]:checked')?.value;

  $('#paymentInfo').innerHTML = method === 'card'
    ? `
      <div class="mock-box">

        <span class="pill">
          PRUEBA SEGURA · SIN DATOS BANCARIOS
        </span>

        <h3>Verificación de tarjeta de prueba</h3>

        <p class="muted">
          Escribe solamente este número ficticio de pruebas:
          <strong>4242 4242 4242 4242</strong>.
          Se comprueba el formato y el algoritmo de Luhn,
          <b>no</b> se verifica con ningún banco.
          No ingreses una tarjeta real.
        </p>

        <div class="field">

          <label for="testCard">
            Número de tarjeta de prueba
          </label>

          <input
            id="testCard"
            inputmode="numeric"
            autocomplete="off"
            placeholder="4242 4242 4242 4242"
            maxlength="23"
          >

        </div>

        <p id="cardResult" class="muted">
          Pendiente de comprobar.
        </p>

        <button
          id="checkCard"
          class="btn btn-dark"
          type="button"
        >
          COMPROBAR TARJETA DE PRUEBA
        </button>

      </div>
    `
    : `
      <div class="mock-box">

        <span class="pill">
          TRANSFERENCIA DEMOSTRATIVA
        </span>

        <h3>Transferencia SPEI</h3>

        <p>
          En un sistema real, aquí aparecerían los datos
          de una cuenta autorizada y una referencia de pago.
        </p>

        <p class="muted">
          CLABE:
          <b>NO DISPONIBLE EN DEMOSTRACIÓN</b>
          <br>
          Referencia:
          <b>DEMO-FUEGO</b>
        </p>

        <p class="notice">
          No transfieras dinero. Esta pantalla no tiene
          cuenta bancaria ni puede verificar transferencias.
        </p>

      </div>
    `;

  $('#checkCard')?.addEventListener('click', () => {

    const value =
      $('#testCard').value.replace(/\s/g,'');

    const valid =
      value === '4242424242424242' && luhn(value);

    $('#cardResult').textContent = valid
      ? '✓ Número ficticio de prueba válido (no es autorización bancaria).'
      : '✕ Usa exclusivamente el número ficticio 4242 4242 4242 4242.';

    $('#cardResult').style.color = valid
      ? '#a9d4b1'
      : '#ffae8c';

    sparkCenter($('#checkCard'));
  });
}

/* VALIDACIÓN DE NÚMERO FICTICIO */

function luhn(s) {

  let sum = 0;
  let dbl = false;

  for (let i = s.length - 1; i >= 0; i--) {

    let n = Number(s[i]);

    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }

    sum += n;
    dbl = !dbl;
  }

  return sum % 10 === 0;
}

/* ACTUALIZAR TOTAL */

function updateCheckout() {

  const p = tiers[cart.tier].prices[cart.day];
  const sub = p * cart.qty;
  const fee = 210 * cart.qty;

  $('#qtyOutput').textContent = cart.qty;
  $('#sumQty').textContent = cart.qty;
  $('#sumUnit').textContent = money(p);
  $('#sumSubtotal').textContent = money(sub);
  $('#sumFee').textContent = money(fee);
  $('#sumTotal').textContent = money(sub + fee);
}

/* BOTONES DE COMPRA */

function bindCheckout() {

  if ($('#checkoutDay')) {

    $('#checkoutDay').addEventListener('change', e => {
      cart.day = Number(e.target.value);
      updateCheckout();
    });

  }

  $('#minusQty').addEventListener('click', () => {
    cart.qty = Math.max(1, cart.qty - 1);
    updateCheckout();
  });

  $('#plusQty').addEventListener('click', () => {
    cart.qty = Math.min(10, cart.qty + 1);
    updateCheckout();
  });

  document.querySelectorAll('input[name="payment"]')
    .forEach(x => x.addEventListener('change', payInfo));

  payInfo();

  $('#checkoutSubmit').addEventListener('click', () => {

    const name = $('#buyerName');
    const email = $('#buyerEmail');

    if (!name.value.trim()) {
      name.reportValidity();
      name.focus();
      return;
    }

    if (!email.checkValidity()) {
      email.reportValidity();
      email.focus();
      return;
    }

    if (!$('#demoAgree').checked) {
      toast('Confirma que entiendes que es una demostración.');
      return;
    }

    if (
      $('input[name="payment"]:checked').value === 'card' &&
      $('#testCard').value.replace(/\s/g,'') !== '4242424242424242'
    ) {
      toast('Para la demostración usa la tarjeta ficticia indicada.');
      return;
    }

    const total =
      tiers[cart.tier].prices[cart.day] * cart.qty +
      210 * cart.qty;

    sessionStorage.setItem(
      'festivalDemoResult',
      JSON.stringify({
        tier: tiers[cart.tier].name,
        qty: cart.qty,
        total,
        method: $('input[name="payment"]:checked').value
      })
    );

    location.hash = '#confirmacion';
  });
}

/* CONFIRMACIÓN */

function confirmation() {

  let data;

  try {
    data = JSON.parse(
      sessionStorage.getItem('festivalDemoResult')
    );
  } catch {}

  if (!data) {

    return head(
      'SIMULACIÓN',
      'SIN COMPRA <em>REGISTRADA.</em>',
      'Inicia una simulación desde la sección de boletos.'
    ) + `
      <section class="section">
        <div class="container">
          ${link('VER BOLETOS','#boletos')}
        </div>
      </section>
    `;
  }

  return head(
    'SIMULACIÓN / RESULTADO',
    'EXPERIENCIA <em>PREPARADA.</em>',
    'Has completado el recorrido de compra de demostración.'
  ) + `
    <section class="section">
      <div class="container" style="max-width:760px">

        <div class="success">

          <span class="eyebrow">
            SIMULACIÓN COMPLETADA
          </span>

          <h2>
            ¡NOS VEMOS EN <em>LA BRASA!</em>
          </h2>

          <p>
            Esta confirmación es ficticia: no se realizó ningún
            pago, reserva ni emisión de boleto.
          </p>

          <div class="summary-line">
            <span>Acceso</span>
            <strong>${data.tier}</strong>
          </div>

          <div class="summary-line">
            <span>Cantidad</span>
            <strong>${data.qty}</strong>
          </div>

          <div class="summary-line">
            <span>Total ilustrativo</span>
            <strong>${money(data.total)}</strong>
          </div>

          <div class="summary-line">
            <span>Método simulado</span>
            <strong>
              ${data.method === 'spei'
                ? 'Transferencia SPEI'
                : 'Tarjeta de prueba'}
            </strong>
          </div>

          <p style="margin-top:25px">
            ${link('VOLVER AL INICIO','#inicio')}
          </p>

        </div>
      </div>
    </section>
  `;
}

/* SISTEMA DE NAVEGACIÓN */

const routes = {
  inicio: home,
  festival,
  experiencias,
  gastronomia: gastronomy,
  boletos: tickets,
  monedero: wallet,
  contacto: contact,
  confirmacion: confirmation
};

function render() {

  const parts = decodeURIComponent(
    location.hash.slice(1) || 'inicio'
  ).split('/');

  const route = parts[0];

  $('#app').innerHTML = route === 'comprar'
    ? checkout(parts[1])
    : (routes[route] || home)();

  document.title =
    `${route === 'inicio'
      ? 'Festival del Fuego'
      : route.charAt(0).toUpperCase() + route.slice(1) +
        ' | Festival del Fuego'} · El Sabor de la Brasa`;

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle(
      'active',
      a.getAttribute('href') === '#' + route
    );
  });

  $('#nav').classList.remove('open');

  $('#menuToggle').setAttribute(
    'aria-expanded',
    'false'
  );

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

  if (route === 'comprar') bindCheckout();
  if (route === 'monedero') bindWallet();

  if (route === 'contacto') {

    $('#contactForm').addEventListener('submit', e => {

      e.preventDefault();

      toast(
        'Formulario validado. En una versión real se enviaría al equipo organizador.'
      );

      e.target.reset();
    });
  }
}

/* SISTEMA DE RECARGAS */

function bindWallet() {

  const fee = 20;
  const amount = $('#walletAmount');

  const refresh = () => {

    $('#walletAmountText').textContent =
      money(Number(amount.value));

    $('#walletTotal').textContent =
      money(Number(amount.value) + fee);
  };

  amount.addEventListener('change', refresh);
  refresh();

  const payment = () => {

    const card = document.querySelector(
      'input[name="walletPayment"]:checked'
    ).value === 'card';

    $('#walletPaymentInfo').innerHTML = card
      ? `
        <div class="mock-box">

          <span class="pill">
            SOLO TARJETA FICTICIA
          </span>

          <h3>Verificación de demostración</h3>

          <p class="muted">
            Utiliza exclusivamente 4242 4242 4242 4242.
            No ingreses tarjetas reales.
            La validación no contacta a ningún banco.
          </p>

          <div class="field">

            <label for="walletTestCard">
              Número ficticio de prueba
            </label>

            <input
              id="walletTestCard"
              inputmode="numeric"
              autocomplete="off"
              placeholder="4242 4242 4242 4242"
              maxlength="23"
            >

          </div>

          <p id="walletCardResult" class="muted">
            Sin verificar.
          </p>

          <button
            type="button"
            class="btn btn-dark"
            id="walletCheckCard"
          >
            VERIFICAR NÚMERO DE PRUEBA
          </button>

        </div>
      `
      : `
        <div class="mock-box">

          <span class="pill">
            SPEI DEMOSTRATIVO
          </span>

          <h3>Transferencia de prueba</h3>

          <p class="muted">
            Referencia ilustrativa: DEMO-RECARGA.
            No se proporciona CLABE ni cuenta real.
            No transfieras dinero.
          </p>

        </div>
      `;

    $('#walletCheckCard')?.addEventListener('click', () => {

      const v =
        $('#walletTestCard').value.replace(/\s/g,'');

      $('#walletCardResult').textContent =
        v === '4242424242424242' && luhn(v)
          ? '✓ Número ficticio correcto. No es autorización bancaria.'
          : '✕ Introduce el número ficticio indicado.';
    });
  };

  document.querySelectorAll('input[name="walletPayment"]')
    .forEach(el => el.addEventListener('change', payment));

  payment();

  $('#walletAdd').addEventListener('click', () => {

    const email = $('#walletIdentifier');

    if (!email.checkValidity()) {
      email.reportValidity();
      email.focus();
      return;
    }

    if (!$('#walletAgree').checked) {
      toast('Confirma que es una simulación.');
      return;
    }

    const method = document.querySelector(
      'input[name="walletPayment"]:checked'
    ).value;

    if (
      method === 'card' &&
      $('#walletTestCard').value.replace(/\s/g,'') !==
        '4242424242424242'
    ) {
      toast('Utiliza solamente el número de prueba.');
      return;
    }

    const amountValue = Number(amount.value);

    $('#walletMsg').textContent =
      `✓ Solicitud DEMO registrada: ${money(amountValue)} de saldo, ` +
      `${money(fee)} de tarifa, total ${money(amountValue + fee)}. ` +
      `Método: ${method === 'card'
        ? 'tarjeta ficticia'
        : 'SPEI simulado'}. ` +
      `No se ha cobrado ni abonado dinero.`;

    toast('Recarga de demostración completada.');
  });
}

/* NOTIFICACIONES */

function toast(msg) {

  const el = $('#toast');

  el.textContent = msg;
  el.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 3500);
}

/* EFECTOS DE CHISPAS */

function sparkAt(x, y) {

  for (let i = 0; i < 16; i++) {

    const p = document.createElement('span');
    p.className = 'spark';

    p.style.left = x + 'px';
    p.style.top = y + 'px';

    const a = Math.random() * Math.PI * 2;
    const r = 25 + Math.random() * 85;

    p.style.setProperty(
      '--dx',
      Math.cos(a) * r + 'px'
    );

    p.style.setProperty(
      '--dy',
      Math.sin(a) * r + 'px'
    );

    $('#sparks').append(p);

    setTimeout(() => p.remove(), 750);
  }
}

function sparkCenter(el) {

  const r = el.getBoundingClientRect();

  sparkAt(
    r.left + r.width / 2,
    r.top + r.height / 2
  );
}

/* ACTIVAR ANIMACIONES EN BOTONES */

document.addEventListener('click', e => {

  const target = e.target.closest(
    'button,.btn,nav a,.brand'
  );

  if (target && !target.disabled) {

    const r = target.getBoundingClientRect();

    sparkAt(
      e.clientX || r.left + r.width / 2,
      e.clientY || r.top + r.height / 2
    );
  }
});

/* MENÚ PARA CELULARES */

$('#menuToggle').addEventListener('click', () => {

  const open = $('#nav').classList.toggle('open');

  $('#menuToggle').setAttribute(
    'aria-expanded',
    String(open)
  );
});

/* INICIAR PÁGINA */

$('#year').textContent = new Date().getFullYear();

window.addEventListener('hashchange', render);

render();

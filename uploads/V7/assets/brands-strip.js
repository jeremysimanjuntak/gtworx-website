/* ════════════════════════════════════════════════════════════════
   GT WORX — Brand Marquee
   Drops a continuously-scrolling strip of car-brand logos into
   any element with id="brands-strip".

   Most brands use Simple Icons CDN. Brands that aren't reliably
   present there (or look poor through the CDN) use bespoke
   inline-SVG marks defined below.
═══════════════════════════════════════════════════════════════ */
(function () {
  // ── Bespoke local logos for brands not well-served by Simple Icons ──
  // Saved with white/transparent processing; the .brand-logo CSS filter
  // (brightness 0 + invert 1) renders them in white.
  const CUSTOM_IMG = {
    'Mercedes-Benz': 'assets/brand-mercedes.png',
    'Bentley':       'assets/brand-bentley.png',
    'Range Rover':   'assets/brand-rangerover.svg',
    'Land Rover':    'assets/brand-landrover.png',
    'Jaguar':        'assets/brand-jaguar.png',
    'Abarth':        'assets/brand-abarth.png',
  };

  const BRANDS = [
    { name: 'Toyota',        slug: 'toyota' },
    { name: 'BMW',           slug: 'bmw' },
    { name: 'Mercedes-Benz' },                          // custom
    { name: 'Bentley' },                                // custom
    { name: 'Range Rover' },                            // custom
    { name: 'Land Rover' },                             // custom
    { name: 'Ford',          slug: 'ford' },
    { name: 'Nissan',        slug: 'nissan' },
    { name: 'Volkswagen',    slug: 'volkswagen' },
    { name: 'SEAT',          slug: 'seat' },
    { name: 'Audi',          slug: 'audi' },
    { name: 'Volvo',         slug: 'volvo' },
    { name: 'Citroën',       slug: 'citroen' },
    { name: 'Jaguar' },                                 // custom
    { name: 'Renault',       slug: 'renault' },
    { name: 'Peugeot',       slug: 'peugeot' },
    { name: 'Fiat',          slug: 'fiat' },
    { name: 'Abarth' },                                 // custom
    { name: 'Lamborghini',   slug: 'lamborghini' },
    { name: 'Ferrari',       slug: 'ferrari' },
    { name: 'Aston Martin',  slug: 'astonmartin' }
  ];

  function buildCell(b) {
    // Bespoke local logo (PNG/SVG) — uses .brand-logo filter for white-ification
    if (CUSTOM_IMG[b.name]) {
      return `
        <div class="brand-cell" title="${b.name}">
          <img class="brand-logo"
               src="${CUSTOM_IMG[b.name]}"
               alt="${b.name}"
               loading="lazy">
        </div>`;
    }
    // Simple Icons CDN — /ffffff suffix forces white
    const src = `https://cdn.simpleicons.org/${b.slug}/ffffff`;
    return `
      <div class="brand-cell" title="${b.name}">
        <img class="brand-logo"
             src="${src}"
             alt="${b.name}"
             loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="brand-fallback" aria-hidden="true">${b.name}</span>
      </div>`;
  }

  function init() {
    const host = document.getElementById('brands-strip');
    if (!host) return;

    // Render the set twice so translateX(-50%) lands on an identical frame
    const cells = BRANDS.map(buildCell).join('');

    host.innerHTML = `
      <section class="brands-section" aria-label="Brands we service">
        <div class="container">
          <div class="brands-strip-row">
            <div class="brands-eyebrow"><span>We Work On</span></div>
            <div class="brands-marquee">
              <div class="brands-track">
                ${cells}${cells}
              </div>
            </div>
          </div>
        </div>
      </section>`;

    // Mark the duplicate cells as decorative for screen readers
    const all = host.querySelectorAll('.brand-cell');
    for (let i = BRANDS.length; i < all.length; i++) all[i].setAttribute('aria-hidden', 'true');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

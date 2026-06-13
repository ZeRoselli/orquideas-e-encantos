document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => nav.classList.toggle("nav--open"));
  document.querySelectorAll(".nav__link").forEach(l => l.addEventListener("click", () => nav.classList.remove("nav--open")));

  window.addEventListener("scroll", () => {
    header.classList.toggle("header--scrolled", window.scrollY > 20);
  });

  const container = document.getElementById("products");
  produtos.forEach(p => {
    const msg = encodeURIComponent(p.whatsapp);
    const el = document.createElement("div");
    el.className = "product";
    el.innerHTML = `
      <img class="product__image" src="${p.imagem}" alt="${p.nome}" loading="lazy">
      <div class="product__body">
        <span class="product__badge">${p.categoria}</span>
        <h3 class="product__title">${p.nome}</h3>
        <p class="product__desc">${p.descricao}</p>
        <div class="product__footer">
          <span class="product__price">${p.preco}</span>
          <a href="https://wa.me/5511951413468?text=${msg}" target="_blank" class="product__btn">
            <i class="fab fa-whatsapp"></i> Comprar
          </a>
        </div>
      </div>
    `;
    container.appendChild(el);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("product--visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".product").forEach(el => observer.observe(el));

  const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("testimonial--visible");
        obs2.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".testimonial").forEach(el => obs2.observe(el));

  document.querySelectorAll("form").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      const btn = f.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Enviado com Sucesso!";
      btn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        f.reset();
      }, 3000);
    });
  });
});

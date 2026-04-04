const whatsappNumber = "6281234567890";
const waButtons = document.querySelectorAll(".wa-button");
const faqItems = document.querySelectorAll(".faq-item");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const floatingWa = document.getElementById("floating-wa");
const header = document.getElementById("site-header");

waButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    const action = button.dataset.action;
    const message =
      action === "jual"
        ? `Halo, saya ingin menjual produk ${productName}. Apakah Doni's Catridge menerima produk ini?`
        : `Halo, saya tertarik untuk membeli produk ${productName}, apakah masih tersedia?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
});

faqItems.forEach((item) => {
  const trigger = item.querySelector(".faq-trigger");
  const content = item.querySelector(".faq-content");
  const icon = item.querySelector(".faq-icon");

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faq) => {
      faq.classList.remove("is-open");
      faq.querySelector(".faq-content").classList.add("hidden");
      faq.querySelector(".faq-icon").textContent = "+";
      faq.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      content.classList.remove("hidden");
      icon.textContent = "-";
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("hidden");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = header ? header.offsetHeight : 0;
    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset +
      1;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const sectionIds = ["home", "tentang", "katalog", "faq", "kontak"];

function updateActiveNavLink() {
  const headerOffset = header ? header.offsetHeight + 24 : 100;
  let currentSection = sectionIds[0];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - headerOffset) {
      currentSection = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "is-active",
      link.getAttribute("href") === `#${currentSection}`,
    );
  });
}

function updateFloatingWaVisibility() {
  if (!floatingWa) {
    return;
  }

  if (window.scrollY < 180) {
    floatingWa.classList.add("is-hidden");
  } else {
    floatingWa.classList.remove("is-hidden");
  }
}

function updateNavbarState() {
  if (!header) {
    return;
  }

  if (window.scrollY <= 40) {
    header.classList.add("nav-transparent");
    header.classList.remove("nav-scrolled");
  } else {
    header.classList.remove("nav-transparent");
    header.classList.add("nav-scrolled");
  }
}

window.addEventListener("scroll", () => {
  updateActiveNavLink();
  updateFloatingWaVisibility();
  updateNavbarState();
});

window.addEventListener("load", () => {
  updateActiveNavLink();
  updateFloatingWaVisibility();
  updateNavbarState();
});

function waParfum() {
  const message =
    "Halo, saya mau jual botol parfum bekas (Eau de Parfum / Eau de Toilette). Apakah masih menerima?";

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

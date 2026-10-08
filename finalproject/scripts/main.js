document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú Responsive Hamburguesa
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 2. Footer dinámico (Año y Última Modificación)
  const currentYearSpan = document.getElementById("currentyear");
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
  const lastModifiedEl = document.getElementById("lastModified");
  if (lastModifiedEl) lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;

  // 3. Local Storage (Bienvenida o visita previa)
  const visitorMsg = document.getElementById("visitor-msg");
  if (visitorMsg) {
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();
    if (!lastVisit) {
      visitorMsg.textContent = "Welcome! This is your first time visiting TechNova Solutions.";
    } else {
      const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        visitorMsg.textContent = "Back so soon! Welcome back today.";
      } else {
        visitorMsg.textContent = `Welcome back! It's been ${diffDays} day(s) since your last visit.`;
      }
    }
    localStorage.setItem("lastVisitDate", now);
  }

  // 4. Carga de Datos JSON con Fetch API y try...catch
  const catalogGrid = document.getElementById("catalog-grid");
  if (catalogGrid) {
    async function loadTechData() {
      try {
        const response = await fetch("data/tech-items.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        displayItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        catalogGrid.innerHTML = "<p>Failed to load technological inventory. Please try again later.</p>";
      }
    }

    function displayItems(items) {
      catalogGrid.innerHTML = "";
      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="card-content">
            <h3>${item.title}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Specs:</strong> ${item.spec}</p>
            <p>${item.description}</p>
            <button class="details-btn" data-title="${item.title}" data-desc="${item.description}">Learn More</button>
          </div>
        `;
        catalogGrid.appendChild(card);
      });

      setupModal();
    }

    loadTechData();
  }

  // 5. Configuración del Modal Dialog
  function setupModal() {
    const modal = document.getElementById("details-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeModal = document.getElementById("close-modal");

    document.querySelectorAll(".details-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        modalTitle.textContent = e.target.getAttribute("data-title");
        modalDesc.textContent = e.target.getAttribute("data-desc");
        modal.showModal();
      });
    });

    if (closeModal) {
      closeModal.addEventListener("click", () => modal.close());
    }
  }
});
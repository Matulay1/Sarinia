const portfolioBtn = document.getElementById("portfolioBtn");
const aboutBtn = document.getElementById("aboutBtn");

const portfolioPage = document.getElementById("portfolioPage");
const aboutPage = document.getElementById("aboutPage");
const homePage = document.getElementById("homePage");

const labels = document.querySelectorAll(".label");
const categoryTitle = document.getElementById("categoryTitle");

const homeLogoBtn = document.getElementById("homeLogoBtn");

const categoryBar = document.getElementById("categoryBar");
const contactBtn = document.querySelector(".contact-btn");

const closePopup = document.getElementById("closePopup");

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const contactPopup = document.getElementById("contactPopup");
const sendBtn = document.getElementById("sendBtn");

const mainVideo = document.getElementById("mainVideo");

const videoCards = document.querySelectorAll(".video-card");

/* ================= CATEGORY DATA ================= */



/* ================= SAFE PAGE SYSTEM ================= */

function showPage(page) {

  homePage.classList.remove("active-page");
  portfolioPage.classList.remove("active-page");
  aboutPage.classList.remove("active-page");

  portfolioBtn.classList.remove("active");
  aboutBtn.classList.remove("active");

  categoryBar.classList.remove("show", "hidden");

  if (page === 0) {
    homePage.classList.add("active-page");
    categoryBar.classList.add("hidden");
  }

  if (page === 1) {
    portfolioPage.classList.add("active-page");
    portfolioBtn.classList.add("active");
    categoryBar.classList.add("show");

  }

  if (page === 2) {
    aboutPage.classList.add("active-page");
    aboutBtn.classList.add("active");
    categoryBar.classList.add("hidden");
  }
}

/* ================= CATEGORY SWITCH ================= */
const galleries = {
    animation: document.getElementById("animationGallery"),
    illustration: document.getElementById("illustrationGallery"),
    concept: document.getElementById("conceptGallery")
  };
  
 labels.forEach(label => {
  label.addEventListener("click", () => {

    labels.forEach(btn => btn.classList.remove("active"));
    label.classList.add("active");

    const selected = label.dataset.category;

    Object.values(galleries).forEach(g => {
      g.style.display = "none";
    });

    if (galleries[selected]) {
      galleries[selected].style.display = "flex";
    }

  });
});
/* ================= NAV BUTTONS ================= */

portfolioBtn.addEventListener("click", () => showPage(1));
aboutBtn.addEventListener("click", () => showPage(2));

if (homeLogoBtn) {
  homeLogoBtn.addEventListener("click", () => showPage(0));
}



/* ================= HOME LOGO BUTTON ================= */

if (homeLogoBtn) {
  homeLogoBtn.addEventListener("click", () => {
    showPage(0);
  });
}

/* ================= DEFAULT PAGE ================= */

showPage(0);

/* ================= CONTACT POPUP ================= */

if (contactBtn && contactPopup) {
    contactBtn.addEventListener("click", () => {
      contactPopup.classList.add("show");
    });
  }
  
  if (closePopup && contactPopup) {
    closePopup.addEventListener("click", () => {
      contactPopup.classList.remove("show");
    });
  }




  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";
  
      const formData = new FormData(form);
  
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });
  
      if (response.ok) {
  
        sendBtn.textContent = "Sent Successfully";
        successMessage.classList.add("show");
  
        form.reset();
  
        setTimeout(() => {
          contactPopup.classList.remove("show");
  
          setTimeout(() => {
            sendBtn.disabled = false;
            sendBtn.textContent = "Send";
            successMessage.classList.remove("show");
          }, 500);
  
        }, 1500);
  
      } else {
        alert("Something went wrong.");
  
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
      }
    });
  }



  const videoTitle = document.getElementById("videoTitle");

  if (mainVideo) {
    videoCards.forEach(card => {
      card.addEventListener("click", () => {
  
        const videoSrc = card.dataset.video;
        const title = card.dataset.title;
  
        mainVideo.src = videoSrc;
        mainVideo.load();
        mainVideo.play();
  
        // 🔥 THIS IS THE NEW PART (title update)
        videoTitle.textContent = title;
        videoTitle.classList.add("show");
  
        videoCards.forEach(v => v.classList.remove("active-video"));
        card.classList.add("active-video");
  
      });
    });
  }
  if (mainVideo.src.includes("mv_4.mp4")) {
    mainVideo.muted = true;
  }

  function setupCarousel(card) {
  const slides = card.querySelectorAll(".slide");
  const left = card.querySelector(".arrow.left");
  const right = card.querySelector(".arrow.right");

  let index = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  left.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  right.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
}

/* apply to both cards */
document.querySelectorAll(".home-card").forEach(setupCarousel);
 

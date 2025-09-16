// ===== SCRIPT.JS =====

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initNavigation();
  initAnimations();
  initInteractions();
});

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Set active nav link based on current page
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Animation and scroll effects
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const animateElements = document.querySelectorAll(
    ".concert-item, .video-item, .welcome-card, .bio-text p"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Header scroll effect
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.boxShadow = "0 4px 25px rgba(212, 175, 55, 0.2)";
    } else {
      header.style.boxShadow = "0 4px 20px rgba(212, 175, 55, 0.15)";
    }

    lastScrollY = currentScrollY;
  });
}

// Interactive elements
function initInteractions() {
  // Concert item hover effects
  const concertItems = document.querySelectorAll(".concert-item");
  concertItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.01)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Video placeholder interactions
  const videoPlaceholders = document.querySelectorAll(".video-placeholder");
  videoPlaceholders.forEach((placeholder) => {
    placeholder.addEventListener("click", function () {
      // Add a subtle pulse effect when clicked
      this.style.animation = "pulse 0.3s ease-in-out";
      setTimeout(() => {
        this.style.animation = "";
      }, 300);
    });
  });

  // Instagram button special effect
  const instagramBtn = document.querySelector(".instagram-btn");
  if (instagramBtn) {
    instagramBtn.addEventListener("mouseenter", function () {
      const svg = this.querySelector("svg");
      if (svg) {
        svg.style.transform = "rotate(5deg) scale(1.1)";
      }
    });

    instagramBtn.addEventListener("mouseleave", function () {
      const svg = this.querySelector("svg");
      if (svg) {
        svg.style.transform = "rotate(0) scale(1)";
      }
    });
  }

  // Email address interaction
  const emailAddress = document.querySelector(".email-address");
  if (emailAddress) {
    emailAddress.addEventListener("click", function () {
      // Copy email to clipboard
      navigator.clipboard
        .writeText(this.textContent)
        .then(() => {
          const originalText = this.textContent;
          this.textContent = "Email copied!";
          this.style.color = "#f4d03f";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.color = "#d4af37";
          }, 2000);
        })
        .catch(() => {
          // Fallback for browsers that don't support clipboard API
          window.location.href = "mailto:" + this.textContent;
        });
    });

    emailAddress.style.cursor = "pointer";
    emailAddress.title = "Click to copy email or send message";
  }

  // Mobile menu handling (if needed in future)
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      this.classList.toggle("active");
    });
  }
}

// Utility function for smooth page transitions
function smoothPageTransition(url) {
  document.body.style.opacity = "0.8";
  document.body.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Add keyboard shortcuts if needed
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "h":
        e.preventDefault();
        window.location.href = "index.html";
        break;
      case "b":
        e.preventDefault();
        window.location.href = "biography.html";
        break;
      case "c":
        e.preventDefault();
        window.location.href = "contact.html";
        break;
    }
  }
});

// Performance optimization
function optimizeImages() {
  const images = document.querySelectorAll("img");

  if ("loading" in HTMLImageElement.prototype) {
    images.forEach((img) => {
      img.loading = "lazy";
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Initialize image optimization
document.addEventListener("DOMContentLoaded", optimizeImages);

// Add pulse animation for clicked elements
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
  const element = document.querySelector(selector);
  if (element && typeof callback === "function") {
    callback(element);
  }
}

// Console message for developers
console.log(
  "%cJames Mayhew Piano Website",
  "color: #d4af37; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cDeveloped with care for musical excellence",
  "color: #b8941f; font-style: italic;"
);

// Particle System
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.width = Math.random() * 4 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles on page load
createParticles();

// Smooth Scroll for navigation links
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

// Scroll Reveal Animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

// Add scroll event listener for reveal animations
window.addEventListener("scroll", reveal);

// Call reveal once on page load to check initial state
reveal();

// Form Submission Handler with Formspree
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const whatsappBtn = document.getElementById("whatsappBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent =
          "✓ Thank you! Your message has been sent successfully.";
        formStatus.className = "form-status success";
        contactForm.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      formStatus.textContent =
        "✗ Oops! There was a problem sending your message. Please try again or contact via WhatsApp.";
      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send via Email";
    }
  });
}

// WhatsApp Button Handler
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent =
        "✗ Please fill in all fields before sending via WhatsApp.";
      formStatus.className = "form-status error";
      return;
    }

    // Construct WhatsApp message
    const whatsappMessage = `Hi! I'm ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/923088346800?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, "_blank");

    // Show success message
    formStatus.textContent = "✓ Opening WhatsApp...";
    formStatus.className = "form-status success";
  });
}

// Parallax Effect on Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// Typing Effect for Hero Text
const heroText = document.querySelector(".hero h2");
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
}

// Add hover animation for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skill tag click interaction
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("click", function () {
    this.style.animation = "pulse 0.5s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });
});

// Add pulse animation dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Navigation background on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.background = "rgba(10, 14, 39, 0.95)";
    nav.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
  } else {
    nav.style.background = "rgba(10, 14, 39, 0.8)";
    nav.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Console message for developers
console.log(
  "%c👋 Hello Developer!",
  "color: #00f5ff; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cLike what you see? Let's connect!",
  "color: #ff00ff; font-size: 14px;",
);

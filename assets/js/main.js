// ====== Light & Dark Theme ======
const themeButton = document.getElementById("theme-toggle");
const iconElement = themeButton.querySelector("i");
const mediaPreference = window.matchMedia("(prefers-color-scheme: dark)");

function deviceTheme() {
  var a = mediaPreference.matches ? "dark" : "light";
  return a;
}

function selectedTheme() {
  var a = localStorage.getItem("selected-theme");
  return a;
}

function toggleTheme() {
  if (document.body.classList.contains("dark")) {
    // Toggle from dark to light
    handleTheme("light")
    handleIconTheme("light");

    // Store the theme value in localStorage
    localStorage.setItem("selected-theme", "light");
  } else {
   // Toggle from dark to light
   handleTheme("dark")
   handleIconTheme("dark");

   // Store the theme value in localStorage
   localStorage.setItem("selected-theme", "dark");
  }
}

themeButton.addEventListener("click", toggleTheme);

function handleIconTheme(theme) {
  switch (theme) {
    case "dark":
      iconElement.classList.remove("ri-moon-fill");
      iconElement.classList.add("ri-sun-fill");
      break;
    case "light":
      iconElement.classList.remove("ri-sun-fill");
      iconElement.classList.add("ri-moon-fill");
      break;

    default:
      break;
  }
}

function handleTheme(theme) {
  switch (theme) {
    case "dark":
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      break;

    case "light":
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      break;
    default:
      break;
  }
}

// Update the device theme when the media preference changes
mediaPreference.addEventListener("change", function (e) {
  let selected = selectedTheme()
  let device = deviceTheme()

  if (!selected) {
    handleTheme(device)
    handleIconTheme(device);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let selected = selectedTheme()
  let device = deviceTheme()

  // Set the theme if there is a selected theme already
  if (selected) {
    handleTheme(selected);
    handleIconTheme(selected);
  } else {
    // Set the theme based on device theme
    handleTheme(device);
    handleIconTheme(device);
  }
});


// ====== Toggle Nav Menu ======
const navMenu = document.getElementById("nav-menu");
const navShow = document.getElementById("nav-toggle");
const navHide = document.getElementById("nav-close");

navShow?.addEventListener("click", toggleNavMenu);
navHide?.addEventListener("click", toggleNavMenu);

function toggleNavMenu() {
  navMenu?.classList.toggle("show-menu");
}

// === Testimonials ===

// Get slider and control elements
const slider = document.getElementById("slides");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const controls = document.querySelectorAll(".slider__control");

// Calculate slide width
const slideWidth = slider?.querySelector(".slide").offsetWidth;

// Declare interval ID for autoplay
let intervalId;

// Start autoplay
function startAutoPlay() {
  intervalId = setInterval(autoPlay, 6000);
}

// Stop autoplay
function stopAutoPlay() {
  clearInterval(intervalId);
}

// Perform autoplay logic
function autoPlay() {
  if (Math.ceil(slider?.scrollLeft) + slider?.offsetWidth >= slider?.scrollWidth) {
    // Reached the end, reset scroll position to beginning
    slider.scrollLeft = 0;
  } else {
    // Scroll to the next slide
    slider.scrollLeft += slideWidth;
  }
}

// Toggle controls based on scroll position
function toggleControls() {
  // Disable previous button if at the beginning
  prevBtn?.classList.toggle("disable", slider?.scrollLeft === 0);

  // Disable next button if at the end
  nextBtn?.classList.toggle(
    "disable",
    // slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth
    Math.ceil(slider?.scrollLeft) === slider?.scrollWidth - slider?.offsetWidth
  );
}

// Attach scroll event listener to toggle controls
slider?.addEventListener("scroll", toggleControls);

// Start autoplay on page load
window.addEventListener("DOMContentLoaded", function () {
  // Only AutoPlay when on large screen
  if (window.innerWidth > 767) {
    startAutoPlay();

    // Stop autoplay when hovering over the slider
    slider?.parentElement?.addEventListener("mouseover", stopAutoPlay);
    slider?.parentElement?.addEventListener("mouseout", startAutoPlay);
  }

  // Handle manual slide navigation
  controls?.forEach((btn) => {
    btn?.addEventListener("click", () => {
      // Determine scroll direction based on button id
      const scrollDirection =
        btn.id === "prev-slide" ? -slideWidth : slideWidth;
      slider.scrollLeft += scrollDirection;

      toggleControls();
    });
  });
});

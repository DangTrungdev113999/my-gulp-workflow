function lazyloadImg() {
  const targets = document.querySelectorAll(".img-lazy");

  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      console.log(entries);
      entries.forEach((entry) => {
        console.log("😍");

        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-lazy");

          img.setAttribute("src", src);
          img.classList.add("fade");

          observer.disconnect();
        }
      });
    });

    io.observe(target);
  };

  targets.forEach(lazyLoad);
}

function handleNavbarMenu() {
  const menuIconElm = document.querySelector("#menuIcon");
  const navbarMobileElm = document.querySelector(".navbarMobile");
  const menuItemsElm = document.querySelector(".menuItems");
  const closeIconElm = document.querySelector("#closeIcon");

  const onCloseNavBar = () => {
    document.body.style.overflow = "visible";
    navbarMobileElm.style.display = "none";
    navbarMobileElm.classList.remove("fade");
    menuItemsElm.classList.remove("sweep-to-left");
  };

  if (menuIconElm && navbarMobileElm && menuItemsElm) {
    menuIconElm.addEventListener("click", function (e) {
      document.body.style.overflow = "hidden";
      navbarMobileElm.style.display = "block";

      const openId = setTimeout(function () {
        navbarMobileElm.classList.add("fade");
        menuItemsElm.classList.add("sweep-to-left");
        clearInterval(openId);
      }, 0);
    });

    navbarMobileElm.addEventListener("click", function () {
      onCloseNavBar();
    });

    menuItemsElm.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
    });

    closeIconElm.addEventListener("click", function () {
      onCloseNavBar();
    });
  }
}

function handleToggleNavSubItems() {
  const servicesElm = document.querySelector("#services");
  const iconElm = servicesElm.querySelector("img");

  servicesElm.addEventListener("click", function () {
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      iconElm.setAttribute("src", "../../images/icons/down-icon.png");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      iconElm.setAttribute("src", "../../images/icons/up-icon.png");
    }
  });
}

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function main() {
  lazyloadImg();
  handleNavbarMenu();
  handleToggleNavSubItems();
  AOS.init({
    disable: "mobile",
    startEvent: "DOMContentLoaded",
    disableMutationObserver: true,
    once: true,
  });
}

docReady(main);

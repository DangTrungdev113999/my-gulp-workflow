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
  const navbarLeftElm = document.querySelector(".navbarLeft");
  const menuItemsElm = document.querySelector(".menuItems");

  if (menuIconElm && navbarLeftElm && menuItemsElm) {
    menuIconElm.addEventListener("click", function (e) {
      document.body.style.overflow = "hidden";
      navbarLeftElm.style.display = "block";

      const openId = setTimeout(function () {
        navbarLeftElm.classList.add("fade");
        menuItemsElm.classList.add("sweep-to-left");
        clearInterval(openId);
      }, 0);
    });

    navbarLeftElm.addEventListener("click", function (e) {
      document.body.style.overflow = "visible";
      navbarLeftElm.style.display = "none";
      navbarLeftElm.classList.remove("fade");
      menuItemsElm.classList.remove("sweep-to-left");
    });

    menuItemsElm.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
    });
  }
}

lazyloadImg();
handleNavbarMenu();
AOS.init({
  disable: "mobile",
  disableMutationObserver: true,
});

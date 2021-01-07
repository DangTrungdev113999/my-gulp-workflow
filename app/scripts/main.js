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

lazyloadImg();
// AOS.init();

AOS.init({
  disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  disableMutationObserver: true,
});

const pages = document.querySelectorAll(".page");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  pages.forEach((page, index) => {

    const trigger = index * window.innerHeight * 0.7;

    if(scrollTop > trigger){

      page.classList.add("flipped");

    } else {

      page.classList.remove("flipped");

    }

  });

});

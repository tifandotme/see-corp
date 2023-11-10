window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    buttonEl.style.display = "block"
  } else {
    buttonEl.style.display = "none"
  }
}

function backToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const buttonEl = document.getElementById("btn-back-to-top")
buttonEl.addEventListener("click", backToTop)

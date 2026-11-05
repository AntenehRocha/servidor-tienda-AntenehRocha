document.addEventListener("DOMContentLoaded", () => {
  const opinionForm = document.getElementById("opinionForm");

  if (opinionForm) {
    opinionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "./thank-you-page.html";
    });
  }
});

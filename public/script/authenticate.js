const selectElement = document.querySelector("#role");

selectElement.addEventListener("change", () => {
  const selectedValue = selectElement.value;

  if (selectedValue === "admin") {
    document.querySelector(".sign-up-form-container").style.display = "block";
    document.querySelector(".sign-up-as-driver-container").style.display =
      "none";
  } else if (selectedValue === "driver") {
    document.querySelector(".sign-up-as-driver-container").style.display =
      "block";
    document.querySelector(".sign-up-form-container").style.display = "none";
  } else {
    document.querySelector(".sign-up-form-container").style.display = "none";
    document.querySelector(".sign-up-as-driver-container").style.display =
      "none";
  }
});

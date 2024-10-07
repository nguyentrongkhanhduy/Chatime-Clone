const selectElement = document.querySelector("#tip");

selectElement.addEventListener("change", () => {
  const selectedValue = parseInt(selectElement.value);
  const price = parseFloat(
    document.querySelector("#item-price").textContent.substring(2)
  );

  let total = price;
  if (selectedValue === 10) {
    total += price * 0.1;
  } else if (selectedValue === 15) {
    total += price * 0.15;
  }
  let tax = total * 0.13;
  total += tax;
  // Format total to two decimal places
  document.querySelector("#item-tax").textContent = `$ ${tax.toFixed(2)}`;

  document.querySelector("#total-price").textContent = `$ ${total.toFixed(2)}`;
});

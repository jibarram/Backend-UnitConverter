function handleSubmit(event) {
  event.preventDefault();
  console.log("handleSubmit called");

  const form = event.target;
  const value = parseFloat(form.value.value);
  const fromUnit = form.fromUnit.value;
  const toUnit = form.toUnit.value;
  const type = form.getAttribute("data-type");

  fetch("/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      value,
      fromUnit,
      toUnit,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `/result?value=${data.value}&fromUnit=${data.fromUnit}&toUnit=${data.toUnit}&result=${data.result}`;
    })
    .catch((error) => console.error("Error:", error));
}
if (window.location.pathname === "/result") {
  document.addEventListener("DOMContentLoaded", () => {
    displayResult();
  });
}
function displayResult() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("value");
  const fromUnit = params.get("fromUnit");
  const toUnit = params.get("toUnit");
  const result = params.get("result");

  const resultElement = document.getElementById("conversion-result");
  if (resultElement) {
    resultElement.textContent = `${value} ${fromUnit} = ${result} ${toUnit}`;
  } else {
    console.error("Element with ID 'conversion-result' not found");
  }
}

function setupNavigation() {
  const tabs = document.querySelectorAll("nav a");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const type = tab.id.split("-")[0];
      loadForm(type);
    });
  });
}

function loadForm(type) {
  const forms = {
    length: `
      <form id="conversion-form" data-type="length" onsubmit="handleSubmit(event)">
        <p>Enter the length to convert:</p>
        <input type="number" name="value" required>
        <p>Unit to Convert from:</p>
        <select name="fromUnit">
          <option value="mm">Millimeter</option>
          <option value="cm">Centimeter</option>
          <option value="m">Meter</option>
          <option value="km">Kilometer</option>
        </select>
        <p>Unit to Convert to:</p>
        <select name="toUnit">
          <option value="mm">Millimeter</option>
          <option value="cm">Centimeter</option>
          <option value="m">Meter</option>
          <option value="km">Kilometer</option>
        </select>
        <button type="submit">Convert</button>
      </form>`,
    weight: `
      <form id="conversion-form" data-type="weight" onsubmit="handleSubmit(event)">
        <p>Enter the weight to convert:</p>
        <input type="number" name="value" required>
        <p>Unit to Convert from:</p>
        <select name="fromUnit">
          <option value="mg">Milligram</option>
          <option value="g">Gram</option>
          <option value="kg">Kilogram</option>
          <option value="lb">Pound</option>
        </select>
        <p>Unit to Convert to:</p>
        <select name="toUnit">
          <option value="mg">Milligram</option>
          <option value="g">Gram</option>
          <option value="kg">Kilogram</option>
          <option value="lb">Pound</option>
        </select>
        <button type="submit">Convert</button>
      </form>`,
    temperature: `
      <form id="conversion-form" data-type="temperature" onsubmit="handleSubmit(event)">
        <p>Enter the temperature to convert:</p>
        <input type="number" name="value" required>
        <p>Unit to Convert from:</p>
        <select name="fromUnit">
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
        <p>Unit to Convert to:</p>
        <select name="toUnit">
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
        <button type="submit">Convert</button>
      </form>`
  };

  const converterForm = document.getElementById("converter-form");
  converterForm.innerHTML = forms[type];
}


// Expose functions globally
window.handleSubmit = handleSubmit;
window.displayResult = displayResult;
// index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const convertLength = (value, fromUnit, toUnit) => {
const units = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 };
return (value * units[fromUnit]) / units[toUnit];
};

const convertWeight = (value, fromUnit, toUnit) => {
const units = { mg: 0.001, g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };
return (value * units[fromUnit]) / units[toUnit];
};

const convertTemperature = (value, fromUnit, toUnit) => {
if (fromUnit === toUnit) return value;
if (fromUnit === "C") return toUnit === "F" ? (value * 9 / 5) + 32 : value + 273.15;
if (fromUnit === "F") return toUnit === "C" ? (value - 32) * 5 / 9 : ((value - 32) * 5 / 9) + 273.15;
if (fromUnit === "K") return toUnit === "C" ? value - 273.15 : ((value - 273.15) * 9 / 5) + 32;
};

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/convert", (req, res) => {
  const { type, value, fromUnit, toUnit } = req.body;
  let result;

  switch (type) {
    case "length":
      result = convertLength(parseFloat(value), fromUnit, toUnit);
      break;
    case "weight":
      result = convertWeight(parseFloat(value), fromUnit, toUnit);
      break;
    case "temperature":
      result = convertTemperature(parseFloat(value), fromUnit, toUnit);
      break;
    default:
      result = "Invalid conversion type.";
  }

  res.json({ value, fromUnit, toUnit, result: result.toFixed(4) });
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "views/result.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

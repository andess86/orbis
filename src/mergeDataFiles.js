"use strict"; // prevents use of undeclared variables

const fs = require("fs");

let counties = fs.readFileSync("./data/counties.json");
let countiesJson = JSON.parse(counties);
let vaccinated = fs.readFileSync("./vaccinated.json");
let vaccinatedJson = JSON.parse(vaccinated);

countiesJson.features.map((countyItem) => {
  vaccinatedJson.map((vaxItem) => {
    if (countyItem.properties.name === vaxItem.region) {
      countyItem.properties.oneDose = vaxItem.enDos;
      countyItem.properties.fullyVaccinated = vaxItem.fulltVaccinerade;
    }
  });
});

console.log("Writing to file.");
let data = JSON.stringify(countiesJson);
fs.writeFileSync("mergedData.json", data, "UTF-8", { flags: "a+" });

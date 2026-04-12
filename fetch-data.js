const url ="https://data.cityofnewyork.us/resource/rsgh-akpg.json?$limit=1000&$offset=0&$order=DateofBite DESC,Breed";
console.log(url);
const response =await fetch(url);
const dogs = await response.json();
console.log(dogs);

const title = "Dog Bites in NYC";

let count = 0;

import fs from "fs";
import path from "node:path";

const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

const outputPath = path.join(dataDir, "dogs.json");
fs.writeFileSync(outputPath, JSON.stringify(dogs, null, 2));
console.log(`Saved to ${outputPath}`);
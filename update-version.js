import fs from "fs";
import { execSync } from "child_process";

// Ścieżka do package.json
const packageJsonPath = "./package.json";

// Pobierz aktualny tag z Git
const gitVersion = execSync("git describe --tags --abbrev=0")
  .toString()
  .trim();

// Wczytaj package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Zaktualizuj wersję w package.json
packageJson.version = gitVersion;

// Zapisz zmiany do package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`✅ Updated version in package.json to version: ${gitVersion}`);
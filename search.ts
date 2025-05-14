const fs = require("fs");
const path = require("path");

// Function to recursively search for package.json in src folder
function findPackageJsonInSrc() {
  const srcPath = path.join(process.cwd(), "src"); // Search only in src folder

  if (!fs.existsSync(srcPath)) {
    console.error("The src folder does not exist in this project.");
    return null;
  }

  function searchDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const result = searchDirectory(filePath); // Recursively search subdirectories
        if (result) return result;
      } else if (file === "package.json") {
        return filePath;
      }
    }

    return null;
  }

  return searchDirectory(srcPath);
}

// Usage Example
const packageJsonPath = findPackageJsonInSrc();

if (packageJsonPath) {
  console.log("Found package.json at:", packageJsonPath);

  // Read the package.json content
  const packageContent = fs.readFileSync(packageJsonPath, "utf-8");
  const packageData = JSON.parse(packageContent);
  console.log("Package.json content:", packageData);
} else {
  console.error("No package.json file found in the src directory.");
}

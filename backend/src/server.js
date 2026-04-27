import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, "../.env") });

// Import app dengan dynamic import
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

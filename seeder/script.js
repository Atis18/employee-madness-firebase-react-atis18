import { config } from "dotenv";
import admin from "firebase-admin";
import fs from "node:fs/promises";

const loadJSON = async (path) =>
  JSON.parse(await fs.readFile(new URL(path, import.meta.url)));

config({ path: "./.env.local" });

const pick = (from) => from[Math.floor(Math.random() * from.length)];

const getSeedData = async () => {
  const [levels, names, positions] = await Promise.all([
    loadJSON("./levels.json"),
    loadJSON("./names.json"),
    loadJSON("./positions.json"),
  ]);

  return names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    created: Date.now()
  }));
};

const main = async () => {
  const account = await loadJSON("./account.json");

  admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: process.env.VITE_FB_DATABASE_URL,
  });

  const db = admin.database();
  const ref = db.ref("employees/list");
  await ref.remove();

  const employees = await getSeedData();
  await Promise.all(employees.map((employee) => ref.push(employee)));
};

main()
  .then(() => {
    console.log("employees added");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

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

  const equipments = ["jira", "mouse", "keyboard", "laptop", "N/A"]

  function getRandomEquipment(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  return names.map((name) => ({
    fullName: name.toLowerCase().trim(),
    name: {
      firstName: name.split(" ")[0],
      middleName: name.split(" ").length > 2 ? name.split(" ").slice(1, -1) : null,
      lastName: name.split(" ")[name.split(" ").length - 1]
    },
    level: pick(levels),
    position: pick(positions),
    equipment: getRandomEquipment(equipments),
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

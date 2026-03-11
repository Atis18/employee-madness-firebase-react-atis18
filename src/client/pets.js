import auth from "../firebase/auth";

const BASE_URL = `${import.meta.env.VITE_FB_DATABASE_URL}/pets`;

const getToken = () => auth?.currentUser?.accessToken ?? "";

const getUriForList = () => `${BASE_URL}/list.json?auth=${getToken()}`;

export const createPet = async (pet) => {
  const response = await fetch(getUriForList(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...pet, created: Date.now() }),
  });

  if (!response.ok) {
    throw new Error("Create operation failed");
  }

  return await response.json();
};
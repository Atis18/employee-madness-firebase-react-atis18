import auth from "../firebase/auth";

/* GIVE AT THE END THE PATH FOR THE FIREBASE DB */
const BASE_URL = `${import.meta.env.VITE_FB_DATABASE_URL}/books`;

const getToken = () => auth?.currentUser?.accessToken ?? "";

const getUriForList = () => `${BASE_URL}/list.json?auth=${getToken()}`;

const getUriForOne = (id) => `${BASE_URL}/list/${id}.json?auth=${getToken()}`;

const _time = (time) => new Date(time).getTime();

export const createBook = async (book) => {
  const response = await fetch(getUriForList(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...book, created: Date.now() }),
  });

  if (!response.ok) {
    throw new Error("Create operation failed");
  }

  return await response.json();
};
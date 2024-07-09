const BASE_URL = "http://localhost:3000";

const getAllDogs = async () => {
  const response = await fetch(`${BASE_URL}/dogs`);
  if (!response.ok) {
    throw new Error(`HTTP failed with status code ${response.status}`);
  }
  return response.json();
};

const postDog = async (dog) => {
  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  });
  if (!response.ok) {
    throw new Error(`HTTP failed with status code ${response.status}`);
  }
  return response.json();
};

const deleteDog = async (id) => {
  const response = await fetch(`${BASE_URL}/dogs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP failed with status code ${response.status}`);
  }
  return response.json();
};

const patchFavoriteForDog = async (id, updatedFields) => {
  const response = await fetch(`${BASE_URL}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error(`HTTP failed with status code ${response.status}`);
  }
  return response.json();
};

export const Requests = {
  getAllDogs,
  postDog,
  deleteDog,
  patchFavoriteForDog,
};

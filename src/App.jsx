import { createContext, useState, useEffect, useContext } from "react";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Requests as api } from "./api";
import toast, { Toaster } from "react-hot-toast";

const DogContext = createContext();

export const useDogs = () => useContext(DogContext);

export const App = () => {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDogs() {
      const fetchedDogs = await api.getAllDogs();
      setDogs(fetchedDogs);
      setLoading(false);
    }
    fetchDogs();
  }, []);

  const updateDog = async (id, updatedFields) => {
    const oldDogs = [...dogs];
    setDogs((prev) =>
      prev.map((dog) => (dog.id === id ? { ...dog, ...updatedFields } : dog))
    );
    try {
      await api.patchFavoriteForDog(id, updatedFields);
    } catch (error) {
      setDogs(oldDogs);
      console.error("Failed to update dog:", error);
    }
  };

  const deleteDog = async (id) => {
    const oldDogs = [...dogs];
    setDogs((prev) => prev.filter((dog) => dog.id !== id));
    try {
      await api.deleteDog(id);
    } catch (error) {
      setDogs(oldDogs);
      console.error("Failed to delete dog:", error);
    }
  };

  const addDog = async (newDog) => {
    const response = await api.postDog(newDog);
    setDogs((prev) => [...prev, response]);
    toast.success("Dog Created");
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        activeTab,
        setActiveTab,
        updateDog,
        deleteDog,
        addDog,
        loading,
      }}
    >
      <Toaster />
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {activeTab === "create" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </div>
    </DogContext.Provider>
  );
};

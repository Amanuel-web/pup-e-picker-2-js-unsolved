import { createContext, useState, useEffect, useContext } from "react";
import { Requests as api } from "../../api";
import toast from "react-hot-toast";

const DogContext = createContext();

export const Provider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetchDogs = () => {
    return api.getAllDogs().then(setDogs);
  };

  useEffect(() => {
    refetchDogs();
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
      toast.error("Failed to update dog:", error);
    }
  };

  const deleteDog = async (id) => {
    const oldDogs = [...dogs];
    setDogs((prev) => prev.filter((dog) => dog.id !== id));
    try {
      await api.deleteDog(id);
    } catch (error) {
      setDogs(oldDogs);
      toast.error("Failed to delete dog:", error);
    }
  };

  const addDog = async (newDog) => {
    setLoading(true);
    await api.postDog(newDog);
    await refetchDogs();
    setLoading(false);
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
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);

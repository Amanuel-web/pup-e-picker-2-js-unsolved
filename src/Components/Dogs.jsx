import { useDogs } from "../App";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { dogs, activeTab, updateDog, deleteDog, loading } = useDogs();

  const filteredDogs = dogs.filter((dog) => {
    if (activeTab === "favorited") return dog.isFavorite;
    if (activeTab === "unfavorited") return !dog.isFavorite;
    return true;
  });

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => deleteDog(dog.id)}
          onEmptyHeartClick={() => updateDog(dog.id, { isFavorite: true })}
          onHeartClick={() => updateDog(dog.id, { isFavorite: false })}
          isLoading={loading}
        />
      ))}
    </>
  );
};

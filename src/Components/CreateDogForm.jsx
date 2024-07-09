import { useState } from "react";
import { useDogs } from "../App";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";

export const CreateDogForm = () => {
  const { addDog, loading } = useDogs();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDog({
      name,
      description,
      image: selectedImage,
      isFavorite: false,
    });
    setName("");
    setDescription("");
    setSelectedImage(dogPictures.BlueHeeler);
    toast.success("Dog Created");
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        cols={80}
        rows={10}
        disabled={loading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        value={selectedImage}
        onChange={(e) => setSelectedImage(e.target.value)}
        disabled={loading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => (
          <option value={pictureValue} key={pictureValue}>
            {label}
          </option>
        ))}
      </select>
      <input type="submit" value="submit" disabled={loading} />
    </form>
  );
};

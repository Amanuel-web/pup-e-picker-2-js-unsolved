import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Toaster } from "react-hot-toast";
import { useDogs } from "./Components/providers/dog.provider";

export const App = () => {
  const { activeTab } = useDogs();

  return (
    <>
      <Toaster />
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {activeTab === "create" ? <CreateDogForm /> : <Dogs />}
        </Section>
      </div>
    </>
  );
};

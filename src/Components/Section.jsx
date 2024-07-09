import { useDogs } from "../App";

export const Section = ({ label, children }) => {
  const { activeTab, setActiveTab, dogs } = useDogs();

  const handleTabClick = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const favoritedCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedCount = dogs.length - favoritedCount;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => handleTabClick("favorited")}
          >
            favorited ({favoritedCount})
          </div>
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleTabClick("unfavorited")}
          >
            unfavorited ({unfavoritedCount})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

import React, { createContext, useState, useContext } from "react";

const TalentContext = createContext();

export const TalentProvider = ({ children }) => {
  const [talentList, setTalentList] = useState([]); // Holds the list of talents

  // Function to add new talent
  const addTalent = (newTalent) => {
    setTalentList((prevList) => [...prevList, newTalent]);
  };

  return (
    <TalentContext.Provider value={{ talentList, addTalent }}>
      {children}
    </TalentContext.Provider>
  );
};

// Hook to use the Talent Context
export const useTalentContext = () => useContext(TalentContext);

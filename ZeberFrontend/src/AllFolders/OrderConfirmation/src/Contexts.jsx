import { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [showAddresses, setShowAddresses] = useState(false);

  return (
    <AppContext.Provider value={{ showAddresses, setShowAddresses }}>
      {children}
    </AppContext.Provider>
  );
};

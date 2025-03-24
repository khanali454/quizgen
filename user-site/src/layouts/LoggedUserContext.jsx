import { createContext, useContext } from 'react';

// Create a context for the logged-in user
export const LoggedUserContext = createContext();

export const useUser = () => useContext(LoggedUserContext);

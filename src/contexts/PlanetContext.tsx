'use client';
import { Planet } from '@/models/planet-models';
import { FC, createContext, useEffect, useState } from 'react';

type PlanetContextType = {
  planet: Planet;
  setPlanet: (planet: Planet) => void;
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (isSideDrawerOpen: boolean) => void;
};

export const PlanetContext = createContext<PlanetContextType>({
  planet: {} as Planet,
  setPlanet: () => {},
  isSideDrawerOpen: false,
  setIsSideDrawerOpen: () => {}
});

type PlanetContextProviderProps = {
  children: React.ReactNode;
};

export const PlanetProvider: FC<PlanetContextProviderProps> = ({ children }) => {
  const [planet, setPlanet] = useState<Planet>({} as Planet); // updates when a row is clicked
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false); // controls PlanetSideDrawer

  return (
    <PlanetContext.Provider
      value={{
        planet,
        setPlanet,
        isSideDrawerOpen,
        setIsSideDrawerOpen
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};

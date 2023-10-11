'use client';

import Loading from '@/components/Loading';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PlanetContext } from '@/contexts/PlanetContext';
import { getResident } from '@/helpers/get-resident';
import { useContext, useEffect, useState } from 'react';

export default function PlanetSideDrawer() {
  const { isSideDrawerOpen, setIsSideDrawerOpen, planet } = useContext(PlanetContext);
  const { residents } = planet; // get resident urls array from selected planet
  const [residentsInfo, setResidentsInfo] = useState<any[]>([]); // TODO --> type redisentsInfo
  const [isLoading, setIsLoading] = useState(false);

  // get residentsInfo from api when residents change
  useEffect(() => {
    setResidentsInfo([]);
    if (!residents || residents.length === 0) return;
    try {
      setIsLoading(true);
      const promises = residents.map(async (resident) => {
        return await getResident(resident);
      });
      Promise.all(promises).then((data) => {
        setResidentsInfo(data);
        setIsLoading(false);
      });
    } catch (error) {
      // TODO --> handle error here, maybe a toast message
      console.log(error);
      setIsLoading(false);
    }
  }, [residents]);

  return (
    <Sheet open={isSideDrawerOpen} onOpenChange={setIsSideDrawerOpen}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle className='text-3xl'>{planet.name}</SheetTitle>
        </SheetHeader>
        <h3 className='text-lg text-gray-500'>Residents</h3>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='flex-grow overflow-y-auto'>
            {residentsInfo.length > 0 ? (
              residentsInfo.map((resident, index) => (
                <div key={index} className='text-lg'>
                  {resident.name}t
                </div>
              ))
            ) : (
              <div className='text-lg'>No residents found</div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

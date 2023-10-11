import Await from '@/components/Await';
import PlanetSideDrawer from '@/components/PlanetSideDrawer';
import { DataTable } from '@/components/planetTable/DataTable';
import { DataTableSkeleton } from '@/components/planetTable/DataTableSkeleton';
import { columns } from '@/components/planetTable/columns';
import { PlanetProvider } from '@/contexts/PlanetContext';
import { getPlanetsWithPagination } from '@/helpers/get-planets';
import { Suspense } from 'react';

export default async function Planets({
  searchParams: { page = '1' }
}: {
  searchParams: { page: string };
}) {
  const promise = getPlanetsWithPagination(page);
  return (
    <PlanetProvider>
      <main className='container overflow-hidden p-10' key={Math.random()}>
        <h1 className='mb-8 text-3xl font-bold'>Star Wars Planets</h1>
        <div>
          {/* Use Suspense and Await for the skeleton loading effect in the server component */}
          {/* getPlanetsWithPagination method is paused for 1 second to demo the skeleton loading effect */}
          <Suspense fallback={<DataTableSkeleton />}>
            <Await promise={promise}>
              {({ results, next, previous }) => (
                <DataTable
                  columns={columns}
                  data={results}
                  next={next ? Number(page) + 1 : null}
                  previous={previous ? Number(page) - 1 : null}
                />
              )}
            </Await>
          </Suspense>
        </div>
        <PlanetSideDrawer />
      </main>
    </PlanetProvider>
  );
}

'use client';

import { Planet } from '@/models/planet-models';
import { ColumnDef } from '@tanstack/react-table';

// columns for the DataTable component
export const columns: ColumnDef<Planet>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'diameter',
    header: 'Diameter'
  },
  {
    accessorKey: 'climate',
    header: 'Climate'
  },
  {
    accessorKey: 'gravity',
    header: 'Gravity'
  },
  {
    accessorKey: 'terrain',
    header: 'Terrain'
  },
  {
    accessorKey: 'population',
    header: 'Population'
  },
  {
    accessorKey: 'residents',
    header: 'Residents',
    cell: ({ row }) => {
      const residents: Planet['residents'] = row.getValue('residents');
      const number = residents.length;
      return <div className='space-x-2 font-medium'>{number}</div>;
    }
  }
];

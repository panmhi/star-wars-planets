'use client';

import { useRouter } from 'next/navigation';

import { ColumnDef, Row, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { PlanetContext } from '@/contexts/PlanetContext';
import { Planet } from '@/models/planet-models';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  next: number | null;
  previous: number | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  next,
  previous
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false
  });
  const { setPlanet, isSideDrawerOpen, setIsSideDrawerOpen } = useContext(PlanetContext);

  const handleRowClick = (row: Row<TData>) => {
    setPlanet(row.original as Planet);
    row.toggleSelected();
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  return (
    <div>
      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push(`/planets?page=${previous}`)}
          disabled={!previous}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push(`/planets?page=${next}`)}
          disabled={!next}
        >
          Next
        </Button>
      </div>
      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='cursor-pointer	'
                  onClick={() => handleRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

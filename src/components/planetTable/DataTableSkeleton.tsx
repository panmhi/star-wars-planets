import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// TODO --> get headers from columns instead of hardcoding them here
export const headers: string[] = [
  'Name',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Population',
  'Residents'
];

export function DataTableSkeleton() {
  return (
    <div>
      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm'>
          Previous
        </Button>
        <Button variant='outline' size='sm'>
          Next
        </Button>
      </div>
      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='relative animate-pulse'>
            {[...Array(10)].map((row, index) => (
              <TableRow key={index}>
                <TableCell colSpan={7}>
                  <div className='h-[21px] rounded bg-gray-200'></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

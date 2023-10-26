import { TableItem } from '@/redux/types';

export const sortData = (data: TableItem[], field: string, order: 'asc' | 'desc') => {
  if (!field || !order) {
    return data;
  }

  const sortedData = [...data];
  sortedData.sort((a, b) => {
    const valueA = String(a[field]);
    const valueB = String(b[field]);

    if (order === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  return sortedData;
};

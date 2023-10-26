import React from 'react';
import { TableComponent } from '../../components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Table page',
};

const TablePage = () => {
  return (
    <main>
      <TableComponent />
    </main>
  );
};

export default TablePage;
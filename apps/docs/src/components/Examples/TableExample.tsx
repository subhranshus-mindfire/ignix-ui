import { useState } from 'react';
import { Table } from '../UI/table';

export function TableExample() {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' as const });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
  ];

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
    // In a real app, you would sort your data here
    console.log(`Sorting by ${key} in ${direction} order`);
  };

  const headings = [
    { label: 'Name', key: 'name', sort: sortConfig.key === 'name' ? sortConfig.direction : 'asc' },
    { label: 'Email', key: 'email', sort: sortConfig.key === 'email' ? sortConfig.direction : 'asc' },
    { label: 'Status', key: 'status', sort: sortConfig.key === 'status' ? sortConfig.direction : 'asc' },
  ];

  return (
    // <Table
    //   headings={[
    //     { label: 'Name', key: 'name', sort: sortConfig.key === 'name' ? sortConfig.direction : 'asc' },
    //     { label: 'Email', key: 'email', sort: sortConfig.key === 'email' ? sortConfig.direction : 'asc' },
    //     { label: 'Status', key: 'status', sort: sortConfig.key === 'status' ? sortConfig.direction : 'asc' },
    //   ]}
    //   data={data}
    //   applySort={handleSort}
    //   currentPage={currentPage}
    //   totalPages={totalPages}
    //   onPageChange={handlePageChange}
    //   variant="surface"
    // />
    // Premium table with all effects
    <div>
      <Table
        headings={headings}
        data={data}
        applySort={handleSort}
        size="lg"
        animationVariant="elastic"
        showHoverEffects={true}
        showStripes={true}
        glowEffect={true}
        variant="surface"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      // Minimal clean table
      <Table
        headings={headings}
        data={data}
        applySort={handleSort}
        size="sm"
        animationVariant="fade"
        showHoverEffects={false}
        showStripes={false}
        glowEffect={false}
        variant="ghost"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      // Row-based table with premium effects
      <Table
        headings={headings}
        data={data}
        applySort={handleSort}
        headingVariant="row"
        size="md"
        animationVariant="flip"
        showHoverEffects={true}
        glowEffect={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TableExample;

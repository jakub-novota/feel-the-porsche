"use client"
import { useEffect, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';

async function getData(): Promise<Car[]> {
  const response = await fetch('/api/cars');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await response.json();
  const data: Car[] = responseData.cars;
  return data;
}

export default function List(): JSX.Element {
  const [data, setData] = useState<Car[]>([]);
  const [sortField, setSortField] = useState<string>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error
      }
    }

    fetchData();
  }, []);

  const handleSortByField = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const formatTime = (time: string): string => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredData = data.filter((car) =>
    car.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    const compareResult = sortOrder === 'asc' ? 1 : -1;

    if (sortField === 'year') {
      return (a.year - b.year) * compareResult;
    } else if (sortField === 'createdAt') {
      return (
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) * compareResult;
    } else {
      return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">All Cars</h1>
      <div className="flex justify-start mb-4">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="border border-gray-400 px-4 py-2 rounded"
        />
      </div>
      <div className="flex justify-center">
        <table className="w-screen">
          <thead>
            <tr>
              <th className="py-2 text-start">
                <p
                  onClick={() => handleSortByField('createdAt')}
                  className="bg-transparent text-start"
                >
                  Created At{' '}
                  {sortField === 'createdAt' &&
                    (sortOrder === 'asc' ? '▲' : '▼')}
                </p>
              </th>
              <th className="py-2 text-start">
                <p
                  onClick={() => handleSortByField('name')}
                  className="bg-transparent"
                >
                  Name
                </p>
              </th>
              <th className="py-2 text-start">
                <p
                  onClick={() => handleSortByField('year')}
                  className="bg-transparent"
                >
                  Year
                </p>
              </th>
              <th className="py-2 text-end">Edit</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((car) => (
              <tr key={car._id} className="mx-auto">
                <td className="py-2">{formatTime(car.createdAt)}</td>
                <td className="py-2">{car.name}</td>
                <td className="py-2">{car.year}</td>
                <td className="py-2 text-end">
                  <Link href={`/test/admin/${car._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/test/admin/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create New Car
        </Link>
      </div>
    </div>
  );
}

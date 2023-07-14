"use client"
import { useEffect, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';
import API_BASE_URL from '@/app/config';

async function getData(): Promise<Car[]> {
  const response = await fetch('/api/cars');

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await response.json();
  const data: Car[] = responseData.cars;
  return data;
}

async function deleteCar(id: string): Promise<void> {
  const response = await fetch(`/api/cars?id=${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Failed to delete car');
  }

  //console.log('Car deleted successfully');
}

async function deleteImage(imageUrl: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/photos/${imageUrl}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }

  //console.log('Image deleted successfully');
}

export default function List(): JSX.Element {
  const [data, setData] = useState<Car[]>([]);
  const [sortField, setSortField] = useState<string>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchValue, setSearchValue] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

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

  const handleDelete = (car: Car) => {
    setCarToDelete(car);
    setShowConfirmation(true);
    // Disable scrolling when the popup is active
    document.body.style.overflow = 'hidden';

    // Log the images of the car
    //console.log('Images to be deleted:', car.gallery, car.image, car.image_cars);

  };

  const handleConfirmDelete = async () => {
    if (carToDelete) {
      try {
        await deleteCar(carToDelete._id);

        // Delete images from car.gallery
        const galleryImages = Object.values(carToDelete.gallery).filter(Boolean);
        for (const imageUrl of galleryImages) {
          await deleteImage(imageUrl);
        }

        // Delete images from car.image
        if (carToDelete.image) {
          await deleteImage(carToDelete.image);
        }

        // Delete images from car.image_cars
        const imageCars = Object.values(carToDelete.image_cars).filter(Boolean);
        for (const imageUrl of imageCars) {
          await deleteImage(imageUrl);
        }

        // Update the data state after deletion
        const updatedData = data.filter((car) => car._id !== carToDelete._id);
        setData(updatedData);
      } catch (error) {
        console.error('Error deleting car:', error);
        // Handle the error
      } finally {
        setShowConfirmation(false);
        setCarToDelete(null);
        // Enable scrolling when the popup is closed
        document.body.style.overflow = 'auto';
      }
    }
  };


  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setCarToDelete(null);
    // Enable scrolling when the popup is closed
    document.body.style.overflow = 'auto';
  };

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
              <th className="py-2 text-end">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((car) => (
              <tr key={car._id} className="mx-auto">
                <td className="py-2">{formatTime(car.createdAt)}</td>
                <td className="py-2">{car.name}</td>
                <td className="py-2">{car.year}</td>
                <td className="py-2 text-end">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/test/admin/${car._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(car)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2 flex items-center"
                    >
                      Delete
                    </button>
                  </div>
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
      {showConfirmation && carToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p>Are you sure you want to delete the car &quot;{carToDelete.name}&quot;?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';

const ImageList = () => {
    const [imageFiles, setImageFiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/test')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setImageFiles(data.files);
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Error fetching image list: {error}</p>;
    }

    return (
        <div>
            <h1>Image List</h1>
            {imageFiles.length === 0 ? (
                <p>No images found.</p>
            ) : (
                <ul>
                    {imageFiles.map((file) => (
                        <li key={file}>{file}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ImageList;

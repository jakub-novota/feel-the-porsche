import { promises as fsPromises } from 'fs';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const { writeFile } = fsPromises;

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const files: File[] | null = data.getAll('file') as unknown as File[];

    if (!files || files.length === 0) {
        return NextResponse.json({ success: false, message: 'No files provided.' });
    }

    const filePromises = files.map(async (file) => {
        // Check if the file is an image
        if (!file.type.startsWith('image/')) {
            return { success: false, message: `Invalid file type. Only image files are allowed for ${file.name}.` };
        }

        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        // Specify the destination directory within the public folder
        const directory = join(process.cwd(), '/images');
        // Specify the file path within the directory
        const filePath = join(directory, file.name);

        // Write the file to the specified path
        await writeFile(filePath, buffer);
        console.log(`File saved at ${filePath}`);

        return {
            name: file.name,
            type: file.type,
            size: file.size,
        };
    });

    const results = await Promise.all(filePromises);

    return NextResponse.json({ success: true, message: 'Files uploaded successfully.', files: results });
}



export async function GET(request: NextRequest) {
    // Specify the directory where the uploaded images are stored
    const directory = join(process.cwd(), '/images');

    try {
        // Read the contents of the directory
        const files = await readdir(directory);

        // Filter the files to only include image files
        const imageFiles = files.filter(
            (file) =>
                file.endsWith('.jpg') ||
                file.endsWith('.jpeg') ||
                file.endsWith('.png')
        );

        // Map the file names to their full URLs
        const imageUrls = imageFiles.map((file) => `/images/${file}`);

        // Return the response with the image URLs
        return NextResponse.json({ success: true, images: imageUrls });
    } catch (error) {
        console.error('Error reading upload directory:', error);
        return NextResponse.json({ success: false, message: 'Error retrieving images.' });
    }
}



export async function DELETE(request: NextRequest) {
    const body = await request.text();
    if (!body) {
        return NextResponse.json({ success: false, message: 'Invalid request body.' });
    }

    const { imageUrl } = JSON.parse(body);

    try {
        // Specify the directory where the uploaded images are stored
        const directory = join(process.cwd(), 'public/uploads');
        // Specify the file path based on the image name
        const filePath = join(directory, imageUrl.replace('/uploads/', ''));

        // Delete the file from the specified path
        await fsPromises.unlink(filePath);
        console.log(`File deleted: ${filePath}`);

        return NextResponse.json({ success: true, message: 'Image deleted successfully.' });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ success: false, message: 'Error deleting image.' });
    }
}


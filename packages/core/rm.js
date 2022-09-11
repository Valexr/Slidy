import { rm } from 'fs/promises';

const path = process.argv[2] || 'dist';
try {
    await rm(path, { recursive: true });
} catch {
    console.log(path);
}

import multer from 'multer';

const storage = multer.memoryStorage(); // Buffer-based upload
export const upload = multer({ storage });
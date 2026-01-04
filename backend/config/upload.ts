import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Ensure upload directory exists
 */
const ensureUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Disk storage configuration
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    ensureUploadDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

/**
 * Memory storage (for small files or cloud upload)
 */
const memoryStorage = multer.memoryStorage();

/**
 * File filter for images
 */
const imageFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'));
  }
};

/**
 * File filter for documents
 */
const documentFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Only document files are allowed (PDF, DOC, DOCX, XLS, XLSX)')
    );
  }
};

/**
 * File filter for videos
 */
const videoFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/webm',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed (MP4, MPEG, MOV, WebM)'));
  }
};

/**
 * Upload configurations
 */
export const uploadConfig = {
  // Single image upload (max 5MB)
  singleImage: multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }).single('image'),

  // Multiple images upload (max 10 files, 5MB each)
  multipleImages: multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
      files: 10,
    },
  }).array('images', 10),

  // Single document upload (max 10MB)
  singleDocument: multer({
    storage,
    fileFilter: documentFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }).single('document'),

  // Single video upload (max 100MB)
  singleVideo: multer({
    storage,
    fileFilter: videoFilter,
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB
    },
  }).single('video'),

  // Avatar upload (max 2MB)
  avatar: multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
  }).single('avatar'),

  // Any file upload (max 50MB)
  anyFile: multer({
    storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
  }).single('file'),

  // Memory storage for cloud upload
  memory: multer({
    storage: memoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }),
};

/**
 * Delete uploaded file
 */
export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Get file info
 */
export const getFileInfo = (filePath: string) => {
  const stats = fs.statSync(filePath);
  return {
    size: stats.size,
    created: stats.birthtime,
    modified: stats.mtime,
    extension: path.extname(filePath),
    name: path.basename(filePath),
  };
};

export default uploadConfig;

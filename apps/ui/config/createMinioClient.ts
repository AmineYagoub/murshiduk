import config from './App';
let minioClient: Minio.Client;
import * as Minio from 'minio';

export function createMinioClient() {
  return new Minio.Client({
    endPoint: config.MINIO.MINIO_HOST,
    useSSL: config.MINIO.MINIO_SSL,
    accessKey: config.MINIO.MINIO_KEY,
    secretKey: config.MINIO.MINIO_SECRET,
  });
}

export function initializeMinio() {
  const _minioClient = minioClient ?? createMinioClient();
  if (typeof window === 'undefined') return _minioClient;
  if (!minioClient) minioClient = _minioClient;
  return _minioClient;
}

export const createBucket = (name: string): Promise<string> => {
  const policy = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::${name}"
      ],
      "Sid": ""
    },
    {
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": [
        "arn:aws:s3:::${name}/*"
      ],
      "Sid": ""
    }
  ]
}
`;
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(name, (err: Error, exists: boolean) => {
      if (err) {
        return reject(err);
      }
      if (!exists) {
        minioClient.makeBucket(name, '', (e: Error) => {
          if (e) {
            console.log(e);
            return reject(e);
          }
          minioClient.setBucketPolicy(name, policy, (err) => {
            if (err) {
              console.log(err);
              return reject(err);
            }
            resolve(name);
          });
        });
      } else {
        minioClient.setBucketPolicy(name, policy, (err) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(name);
        });
      }
    });
  });
};

export const uploadFile = (bucket: string, file: string, name: string) => {
  const minioClient = initializeMinio();
  return new Promise<boolean>((resolve, reject) => {
    minioClient.fPutObject(bucket, name, file, (e: Error) => {
      if (e) {
        console.log(e);
        return reject(e);
      }
      resolve(true);
    });
  });
};

export const getUrl = (
  bucket: string,
  file: string,
  days: number
): Promise<string> => {
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.presignedGetObject(
      bucket,
      file,
      days * (24 * 60 * 60),
      (err: Error, presignedUrl: string) => {
        if (err) return reject(err);
        resolve(presignedUrl);
      }
    );
  });
};

export const deleteFile = (
  bucket: string,
  objectName: string
): Promise<boolean> => {
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucket, objectName, (err: Error) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

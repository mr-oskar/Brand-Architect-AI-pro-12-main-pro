import { objectStorageClient } from "./objectStorage";
import { randomUUID } from "crypto";
import { Readable } from "stream";

function getPrivateObjectDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR || "";
  if (!dir) throw new Error("PRIVATE_OBJECT_DIR not set");
  return dir;
}

function parseBucketPath(path: string): { bucketName: string; objectName: string } {
  const p = path.startsWith("/") ? path : `/${path}`;
  const parts = p.split("/");
  return { bucketName: parts[1], objectName: parts.slice(2).join("/") };
}

/**
 * Upload a Buffer directly to GCS (server-side).
 * Returns the normalized object path, e.g. "/objects/uploads/<uuid>"
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  contentType = "image/png"
): Promise<string> {
  const privateDir = getPrivateObjectDir();
  const objectId = randomUUID();
  const fullPath = `${privateDir}/uploads/${objectId}`;
  const { bucketName, objectName } = parseBucketPath(fullPath);

  const bucket = objectStorageClient.bucket(bucketName);
  const file = bucket.file(objectName);

  await file.save(buffer, {
    metadata: { contentType },
    resumable: false,
  });

  return `/objects/uploads/${objectId}`;
}

/**
 * Stream a stored image back to the response.
 * objectPath should be like "/objects/uploads/<uuid>"
 */
export async function streamStoredImage(
  objectPath: string
): Promise<{ stream: Readable; contentType: string } | null> {
  const privateDir = getPrivateObjectDir();
  const entityId = objectPath.replace(/^\/objects\//, "");
  const fullPath = `${privateDir}/${entityId}`;
  const { bucketName, objectName } = parseBucketPath(fullPath);

  const bucket = objectStorageClient.bucket(bucketName);
  const file = bucket.file(objectName);

  const [exists] = await file.exists();
  if (!exists) return null;

  const [metadata] = await file.getMetadata();
  const contentType = (metadata.contentType as string) || "image/png";
  const stream = file.createReadStream();
  return { stream, contentType };
}

/**
 * Check whether a value is a stored object path (not base64).
 */
export function isStoragePath(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("/objects/");
}

/**
 * Convert a stored object path to a serving URL.
 * e.g. "/objects/uploads/uuid" => "/api/storage/images/uploads/uuid"
 */
export function storagePathToUrl(objectPath: string): string {
  return `/api/storage/images${objectPath}`;
}

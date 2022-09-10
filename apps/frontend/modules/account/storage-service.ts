import type { Result } from "@utils/monads";

type UploadDestination = string

interface IStorageService {
    uploadFile: (blob: Blob) => Promise<Result<UploadDestination>>,
    getFile: (location: UploadDestination) => Promise<Result<Blob>>
}


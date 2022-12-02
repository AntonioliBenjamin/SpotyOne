import { DomainError } from './DomainError';
export namespace LibraryErrors {
    export class AlbumAlreadyAdded extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
        }
    }

    export class TrackAlreadyAdded extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
        }
    }

    export class NotFound extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
        }
    }
}
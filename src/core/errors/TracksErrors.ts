import { DomainError } from './DomainError';

export namespace TrackErrors {
    export class AlreadyExist extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
        }
    }

    export class NotFound extends DomainError {
        constructor() {
            super("Track not found")
        }
    }
}
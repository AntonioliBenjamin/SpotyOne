import { DomainError } from './DomainError';

export namespace UserErrors {
    export class NotFound extends DomainError {
        constructor() {
            super("user not found") 
        }
    }

    export class WrongPassword extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
            
        }
    }

    export class AlreadyExist extends DomainError {
        message: string
        constructor(message: string) {
            super(message)
        }
    }

}
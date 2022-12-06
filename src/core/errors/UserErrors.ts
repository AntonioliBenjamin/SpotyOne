import { DomainError } from './DomainError';

export namespace UserErrors {
    export class NotFound extends DomainError {
        constructor() {
            super("user not found") 
        }
    }

    export class WrongPassword extends DomainError {
        constructor() {
            super("wrong password")
            
        }
    }

    export class AlreadyExist extends DomainError {
        constructor() {
            super("user already exists")
        }
    }

}
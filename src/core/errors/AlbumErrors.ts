import { DomainError } from "./DomainError";
export namespace AlbumErrors {
  export class AlreadyExist extends DomainError {
    message: string;
    constructor(message: string) {
      super(message);
    }
  }

  export class NotFound extends DomainError {
    constructor() {
      super("Album not found");
    }
  }
}
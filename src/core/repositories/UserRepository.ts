import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";
import {UserDeletedInput} from "../Usecases/user/DeleteUser";
import {AddAlbumInput} from "../Usecases/user/AddAlbumPropertiesToLibrary";
import {AddTrackInput} from "../Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveAlbumInput} from "../Usecases/user/RemoveAlbumPropertiesToLibrary";
import {RemoveTrackInput} from "../Usecases/user/RemoveTrackPropertiesToLibrary";

export interface UserRepository {
    create(userInput: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(id: string): Promise<User>;

    update(userInput: UserUpdatedInput): Promise<User>;

    delete(userInput: User): Promise<User>;
}
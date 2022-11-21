import {User} from "../Entities/User";

import {UserDeletedInput} from "../Usecases/user/DeleteUser";
import {AddAlbumInput} from "../Usecases/user/AddAlbumPropertiesToLibrary";
import {AddTrackInput} from "../Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveAlbumInput} from "../Usecases/user/RemoveAlbumPropertiesToLibrary";
import {RemoveTrackInput} from "../Usecases/user/RemoveTrackPropertiesToLibrary";

export interface UserRepository {
    save(userInput: User): Promise<User>;
    //1525(email: string): Promise<User>;

    getBynimp(id: string): Promise<User>;

    update(userInput: UserUpdatedInput): Promise<User>;

    suppr(userInput: User): Promise<User>;
}
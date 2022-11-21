import {User} from "../Entities/User";

import {UserDeletedInput} from "../Usecases/user/DeleteUser";
import {AddTrackInput} from "../Usecases/user/AddTrackPropertiesToLibrary";
import {RemoveAlbumInput} from "../Usecases/user/RemoveAlbumPropertiesToLibrary";
import {RemoveTrackInput} from "../Usecases/user/RemoveTrackPropertiesToLibrary";

export interface UserRepository {
    create(input: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(userId: string): Promise<User>;

    update(input: UserUpdatedInput): Promise<User>;

    delete(input: UserDeletedInput): Promise<User>;

    addAlbum(input: AddAlbumInput): Promise<User>;

    removeAlbum(input: RemoveAlbumInput): Promise<User>;

    addTrack(input: AddTrackInput): Promise<User>;

    removeTrack(input: RemoveTrackInput): Promise<User>;
}
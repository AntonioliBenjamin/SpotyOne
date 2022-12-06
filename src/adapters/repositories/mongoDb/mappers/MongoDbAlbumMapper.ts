import {Album} from "../../../../core/Entities/Album";
import {albumModel} from "../models/album";

export class MongoDbAlbumMapper {
    toAlbum(albumModel: albumModel): Album {
        return new Album({
            albumId : albumModel.albumId,
            userId : albumModel.userId,
            artist: albumModel.artist,
            albumTitle : albumModel.albumTitle,
            file : albumModel.file,
            tracks: albumModel.tracks,
            created : new Date(albumModel.created),
            updated : new Date(albumModel.updated),
            cover: albumModel.cover
        });
    }
    toAlbumModel(album: Album): albumModel {
        return {
            albumId : album.props.albumId,
            userId : album.props.userId,
            artist : album.props.artist,
            albumTitle : album.props.albumTitle,
            file : album.props.file,
            tracks : album.props.tracks,
            created : +album.props.created,
            updated : +album.props.updated,
            cover: album.props.cover         
        };
    }
}
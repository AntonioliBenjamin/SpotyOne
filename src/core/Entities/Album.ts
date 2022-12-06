export type TrackProperties = {
  trackId: string;
  trackTitle: string;
};

export type AlbumProperties = {
  albumId: string;
  albumTitle: string;
  artist: string;
  cover?: string;
  file: string;
  tracks: Array<TrackProperties>;
  created: Date;
  updated: Date;
  userId: string;
};
export class Album {
  props: AlbumProperties;
  constructor(props: AlbumProperties) {
    this.props = props;
  }
  
  static create(props: {
    albumId: string;
    albumTitle: string;
    cover?: string;
    artist: string;
    file: string;
    tracks: Array<TrackProperties>;
    userId: string;
  }) {
    return new Album({
      albumId: props.albumId,
      userId: props.userId,
      artist: props.artist,
      cover: props.cover ? props.cover : "https://resize-europe1.lanmedia.fr/r/600,600/img/var/europe1/storage/images/media/images/jojo640789/50000240-1-fre-FR/jojo640789_reference.jpg",
      albumTitle: props.albumTitle,
      file: props.file,
      tracks: props.tracks,
      created: new Date(),
      updated: null,
    });
  }

  update(props: {
    file: string;
    tracks: TrackProperties;
    albumTitle: string;
    artist: string;
    cover: string
  }) {
    this.props.file = props.file;
    this.props.cover = props.cover;
    this.props.tracks.push(props.tracks);
    this.props.albumTitle = props.albumTitle;
    this.props.artist = props.artist;
    this.props.updated = new Date();
  }
}

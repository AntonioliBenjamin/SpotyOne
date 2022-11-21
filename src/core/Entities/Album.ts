export type TrackProperties = {
  trackId: string;
  trackTitle: string;
  duration: number;
  file: string;
};

export type AlbumProperties = {
  albumId: string;
  albumTitle: string;
  file: string;
  tracksCount: number;
  totalDuration: number;
  tracks: Array<TrackProperties>;
  ownerId: string;
};

export class Album {
  props: AlbumProperties;
  constructor(props: AlbumProperties) {
    this.props = props;
  }

  static create(props: {
    albumId: string;
    albumTitle: string;
    file: string;
    tracksCount: number;
    totalDuration: number;
    tracks: Array<TrackProperties>
    ownerId: string;
  }) {
    return new Album({
        albumId: props.albumId,
        ownerId: props.ownerId,
        albumTitle: props.albumTitle,
        file: props.file,
        tracksCount: props.tracks.length,
        totalDuration: props.totalDuration, // à terminé
        tracks: props.tracks
    });
  }

  update(props: {
    file: string;
    tracks: Array<TrackProperties>;
    albumTitle: string;
  }) {
    this.props.file = props.file;
    this.props.tracks = props.tracks;
    this.props.albumTitle = props.albumTitle;
  }
}
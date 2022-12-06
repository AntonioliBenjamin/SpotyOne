import { Library } from './../../Entities/Library';
import { Track } from "./../../Entities/Track";
import { InMemoryTrackRepository } from "../adapters/repositories/InMemoryTrackRepository";
import { AddTrackToLibrary } from "../../Usecases/library/AddTrackIdtoLibrary";
import { InMemoryLibraryRepository } from "../adapters/repositories/InMemoryLibraryRepository";
import { LibraryErrors } from "../../errors/LibraryErrors";
const dbLibrary = new Map<string, Library>();
const dbTrack = new Map<string, Track>();

describe("Unit - UpdateLibrary", () => {
  const inMemoryTrackRepository = new InMemoryTrackRepository(dbTrack);
  const inMemoryLibraryRepository = new InMemoryLibraryRepository(dbLibrary);
  const addTrackToLibrary = new AddTrackToLibrary(
    inMemoryLibraryRepository,
    inMemoryTrackRepository
  );
  let track: Track;
  let track2: Track;
  let library : Library
  beforeAll(() => {
    library = new Library({
      albums: [],
      tracks: [
        {
          trackTitle: "kit kat",
          trackId: "8888",
        },
      ],
      libraryId: "9999",
      title: "my library title",
      userId: "12345",
    });
    track = new Track({
      artist: "artist name",
      created: new Date(), 
      duration: 200,
      userId: "8888",
      file: "http://tracklink",
      trackId: "9999",
      trackTitle: "my track title",
      updated: new Date(),
    });

    dbTrack.set(track.props.trackId, track);
    dbLibrary.set(library.props.libraryId, library);
  });

  it("should throw if the track is already added", async () => {
    jest.setTimeout(5000);
    track = new Track({
      artist: "artist name",
      created: new Date(),
      duration: 200,
      userId: "888899",
      file: "http://tracklink",
      trackId: "9999",
      trackTitle: "my track title",
      updated: new Date(),
    });
    dbTrack.set(track.props.trackId, track);
    await addTrackToLibrary.execute({
      trackTitle: track.props.trackTitle,
      userId: "12345",
    });
    const result = addTrackToLibrary.execute({
      trackTitle: track.props.trackTitle,
      userId: "12345",
    });
    await expect(result).rejects.toThrow(new LibraryErrors.TrackAlreadyAdded());
    
  });
  it("should add a track in library", async () => {
    track2 = new Track({
        artist: "artist name",
        created: new Date(), 
        duration: 200,
        userId: "8888",
        file: "http://tracklink",
        trackId: "1111",
        trackTitle: "my track title2",
        updated: new Date(),
      });
      dbTrack.set(track2.props.trackId, track2);
    const result = await addTrackToLibrary.execute({
      trackTitle: "my track title2",
      userId: "12345",
    });
    expect(result.props.tracks).toHaveLength(3);
    expect(result.props.tracks[2].trackTitle).toEqual("my track title2");
    expect(result.props.tracks[2].trackId).toEqual("1111");
  });
});

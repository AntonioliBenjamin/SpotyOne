import { Track } from '../../../Entities/Track';
import { TrackUpdatedInput } from '../../../Usecases/track/UpdateTrack';
import { TrackRepository } from './../../../repositories/TrackRepository';

export class InMemoryTrackRepository implements TrackRepository {
    constructor(private readonly db: Map<string, Track>) {}
    
    async create(input: Track): Promise<Track> {
        this.db.set(input.props.trackId, input)
        return input
    }
    async getByUserId(userId: string): Promise<Track> {
        const values = Array.from(this.db.values());
        const track = values.find(track => track.props.userId === userId);
        return track
    }
    update(input: TrackUpdatedInput): Promise<Track> {
        throw new Error('Method not implemented.');
    }
    delete(userId: string): string {
        this.db.delete(userId)
        return userId
    }
    getById(trackId: string): Promise<Track> {
        throw new Error('Method not implemented.');
    }

    async getByTitle(trackTitle: string): Promise<Track> {
        const values = Array.from(this.db.values());
        const track = values.find(track => track.props.trackTitle === trackTitle);
        if (!track) {
            throw new Error('track not found');
        }
        return track
    }

    async exist(trackTitle: string, artist: string): Promise<Boolean> {
        const values = Array.from(this.db.values());
        const isTrackExist = values.find(elm => elm.props.trackTitle === trackTitle && elm.props.artist === artist)
        if (isTrackExist) {
            return true
        }
        return false
    }

}
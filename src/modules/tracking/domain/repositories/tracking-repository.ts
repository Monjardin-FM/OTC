import { Tracking } from '../entities/tracking';
import { TrackingDetail } from '../entities/tracking-detail';

export type TrackingRepository = {
  getTracking: () => Promise<Tracking[]>;
  getTrackingDetail: (params: { personId: number }) => Promise<TrackingDetail>;
};

import { TrackingRepository } from 'modules/tracking/domain/repositories/tracking-repository';
import { getTrackingService } from 'modules/tracking/infraestructure/services/get-tracking';
import { useAsyncFn } from 'react-use';

export const useGetTracking = () => {
  const [{ value: tracking, loading, error }, getTracking] = useAsyncFn<
    TrackingRepository['getTracking']
  >(getTrackingService, [getTrackingService]);
  return {
    tracking,
    loading,
    error,
    getTracking,
  };
};

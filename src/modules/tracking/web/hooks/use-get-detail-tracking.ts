import { TrackingRepository } from 'modules/tracking/domain/repositories/tracking-repository';
import { getTrackingDetailService } from 'modules/tracking/infraestructure/services/get-tracking-detail';
import { useAsyncFn } from 'react-use';

export const useGetDetailTracking = () => {
  const [{ value: trackingDetail, loading, error }, getTrackingDetail] =
    useAsyncFn<TrackingRepository['getTrackingDetail']>(
      getTrackingDetailService,
      [getTrackingDetailService],
    );
  return {
    trackingDetail,
    loading,
    error,
    getTrackingDetail,
  };
};

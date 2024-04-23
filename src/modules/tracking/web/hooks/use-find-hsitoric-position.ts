import { TrackingRepository } from 'modules/tracking/domain/repositories/tracking-repository';
import { findHistoricPositionService } from 'modules/tracking/infraestructure/services/find-historic-position';
import { useAsyncFn } from 'react-use';

export const useFindHistoricPosition = () => {
  const [{ value: historicPosition, loading, error }, findHistoricPosition] =
    useAsyncFn<TrackingRepository['postHistoricPosition']>(
      findHistoricPositionService,
      [findHistoricPositionService],
    );
  return {
    historicPosition,
    findHistoricPosition,
    loading,
    error,
  };
};

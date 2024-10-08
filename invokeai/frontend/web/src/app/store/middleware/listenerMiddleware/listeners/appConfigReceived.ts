import type { AppStartListening } from 'app/store/middleware/listenerMiddleware';
import { setInfillMethod } from 'features/controlLayers/store/paramsSlice';
import { shouldUseNSFWCheckerChanged, shouldUseWatermarkerChanged } from 'features/system/store/systemSlice';
import { appInfoApi } from 'services/api/endpoints/appInfo';

export const addAppConfigReceivedListener = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: appInfoApi.endpoints.getAppConfig.matchFulfilled,
    effect: (action, { getState, dispatch }) => {
      const { infill_methods = [], nsfw_methods = [], watermarking_methods = [] } = action.payload;
      const infillMethod = getState().params.infillMethod;

      if (!infill_methods.includes(infillMethod)) {
        // if there is no infill method, set it to the first one
        // if there is no first one... god help us
        dispatch(setInfillMethod(infill_methods[0] as string));
      }

      if (!nsfw_methods.includes('nsfw_checker')) {
        dispatch(shouldUseNSFWCheckerChanged(false));
      }

      if (!watermarking_methods.includes('invisible_watermark')) {
        dispatch(shouldUseWatermarkerChanged(false));
      }
    },
  });
};

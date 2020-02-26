import { store } from './index';
import { handleError } from './helper';
import { NetworkServices, AuthServices } from '../Services';
import { eNoticeListingAction } from './reducers';
import Config from '../Config';

export const fetchENoticeListing = async () => {
  try {
    store.dispatch(eNoticeListingAction.init());
    const response = await NetworkServices.get(
      `${Config.SERVER_URL}/students/enotice`
    );
    // Save Data To Redux
    store.dispatch(eNoticeListingAction.success(response.data || {}));
  } catch (err) {
    handleError(err);
    store.dispatch(
      eNoticeListingAction.failed({
        internalMessage: err.message,
        displayMessage: 'Error in fetchENoticeListing'
      })
    );
  }
};

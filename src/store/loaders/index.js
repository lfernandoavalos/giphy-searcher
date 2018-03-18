/**
 * https://github.com/kouhin/redux-dataloader
 * Aysnc use redux-dataloader
 */
import { createLoader, fixedWait } from 'redux-dataloader';

import { HTTP_REQUEST } from './../../redux/generic.types';

const loader = createLoader(HTTP_REQUEST, {
  /*
   * (required) Handle fetched data, return a success action
   */
  success: (context, result) => context.action.success(result, context),
  /*
   * (required) Handle error, return a failure action
   */
  error: context => context.action.error(),
  /*
   * (optional) By default, original request action will be dispatched.
   */
  loading: context => context.action.loading(),
  /*
   * Use axios through context actions
   */
  fetch: context => context.action.fetch(),
}, {
  ttl: 10000,
  retryTimes: 3,
  retryWait: fixedWait(500),
});

export default [loader];

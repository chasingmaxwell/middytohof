/* @flow */

import type {
  LambdaHandler,
  LambdaContext,
  LambdaCallback,
} from '../flow/types/aws.js';

type MiddyInstance<Event> = {
  event: Event,
  context: LambdaContext,
  callback: LambdaCallback,
  response: ?any,
  error: ?Error,
};

/**
 * Convert a Middy middleware plugin to a chainable higher-order function.
 *
 * @param plugin The Middy plugin to convert.
 *
 * @return The chainable higher-order function which returns a lambda handler.
 */
function middyToHOF<Event>({
  after,
  before,
  onError,
}: {
  after: (instance: MiddyInstance<Event>, () => void) => void | Promise<any>,
  before: (instance: MiddyInstance<Event>, () => void) => void | Promise<any>,
  onError: (instance: MiddyInstance<Event>, () => void) => void | Promise<any>,
}) {
  return (handler: LambdaHandler<Event>): LambdaHandler<Event> => async (
    event: Event,
    context: LambdaContext,
    callback: LambdaCallback
  ) => {
    const instance: MiddyInstance<Event> = {
      event,
      context,
      callback,
      response: null,
      error: null,
    };

    try {
      // Do stuff before.
      if (before) {
        await new Promise(resolve => before(instance, resolve));
      }

      // Invoke the wrapped handler.
      return await handler(event, context, async (err, res) => {
        // Do callback error stuff.
        if (err) {
          instance.error = err;
          if (onError) {
            await new Promise(resolve => onError(instance, resolve));
          }
          return callback(instance.error);
        }

        // Do stuff after.
        instance.response = res;
        if (after) {
          await new Promise(resolve => after(instance, resolve));
        }
        return callback(null, instance.response);
      });
    } catch (err) {
      // Do handler error stuff.
      instance.error = err;
      if (onError) {
        await new Promise(resolve => onError(instance, resolve));
      }
      return callback(instance.error);
    }
  };
}

module.exports = middyToHOF;

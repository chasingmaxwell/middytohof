const middytohof = require('./index');

describe('middytohof', () => {
  let before;
  let after;
  let onError;

  beforeEach(() => {
    before = jest.fn((handler, next) => next());
    after = jest.fn((handler, next) => next());
    onError = jest.fn((handler, next) => next());
  });

  it('passes the result of the handler it wraps', async () => {
    expect.assertions(2);
    const response = { iAm: 'a response' };
    const callback = jest.fn();
    const handler = jest.fn((e, c, callback) => {
      callback(null, response);
    });
    await middytohof({})(handler)({}, {}, callback);
    expect(handler).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(null, response);
  });

  it('passes the callback error of the handler it wraps', async () => {
    expect.assertions(2);
    const error = new Error('some other handler callback error');
    const callback = jest.fn();
    const handler = jest.fn((e, c, callback) => {
      callback(error);
    });
    await middytohof({})(handler)({}, {}, callback);
    expect(handler).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(error);
  });

  it('passes the handler error of the handler it wraps', async () => {
    expect.assertions(2);
    const error = new Error('some other handler error');
    const callback = jest.fn();
    const handler = jest.fn(() => {
      throw error;
    });
    await middytohof({})(handler)({}, {}, callback);
    expect(handler).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(error);
  });

  it('invokes before and after plugin methods', async () => {
    expect.assertions(2);
    const handler = jest.fn((e, c, callback) =>
      callback(null, { iAm: 'a response' })
    );
    await middytohof({ before, after })(handler)({}, {}, () => {});
    expect(before).toHaveBeenCalled();
    expect(after).toHaveBeenCalled();
  });

  it('invokes onError on callback errors', async () => {
    expect.assertions(2);
    const error = new Error('Uh oh! Callback error!');
    const handler = jest.fn((e, c, callback) => callback(error));
    await middytohof({ onError })(handler)({}, {}, err => {
      expect(err).toEqual(error);
    });
    expect(onError).toHaveBeenCalled();
  });

  it('invokes onError on handler errors', async () => {
    expect.assertions(2);
    const error = new Error('Uh oh! Handler error!');
    const handler = jest.fn(() => {
      throw error;
    });
    await middytohof({ onError })(handler)({}, {}, err => {
      expect(err).toEqual(error);
    });
    expect(onError).toHaveBeenCalled();
  });
});

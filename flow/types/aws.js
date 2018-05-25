// @flow

export type ApiGatewayEvent = {
  body: ?string,
  headers: { [name: string]: string },
  httpMethod: string,
  isBase64Encoded: boolean,
  path: string,
  pathParameters: ?{ [name: string]: string },
  queryStringParameters: ?{ [name: string]: string },
  stageVariables: ?{ [name: string]: string },
  requestContext: {
    accountId: string,
    apiId: string,
    httpMethod: string,
    identity: {
      accessKey: ?string,
      accountId: ?string,
      apiKey: ?string,
      caller: ?string,
      cognitoAuthenticationProvider: ?string,
      cognitoAuthenticationType: ?string,
      cognitoIdentityId: ?string,
      cognitoIdentityPoolId: ?string,
      sourceIp: string,
      user: ?string,
      userAgent: ?string,
      userArn: ?string,
    },
    stage: string,
    requestId: string,
    resourceId: string,
    resourcePath: string,
  },
  resource: string,
};

export type LambdaContext = {
  callbackWaitsForEmptyEventLoop: boolean,
  functionName: string,
  functionVersion: string,
  invokedFunctionArn: string,
  memoryLimitInMB: number,
  awsRequestId: string,
  logGroupName: string,
  logStreamName: string,
};

export type LambdaCallback = (
  error: ?Error,
  result: ?any
) => void | Promise<any>;

export type LambdaHandler<Event> = (
  event: Event,
  context: LambdaContext,
  callback: LambdaCallback
) => void | Promise<any>;

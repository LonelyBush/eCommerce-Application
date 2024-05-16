/* eslint-disable import/no-extraneous-dependencies */
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './build-client';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.PROJECT_KEY!,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot.get().execute();
};

// export default getProject;


'use strict';

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');

const analytics = google.analytics({
  version: 'v3',
  auth: sampleClient.oAuth2Client,
});

// Custom Goals must exist prior to being used as an objectiveMetric
const objectiveMetric = 'ga:goal1Completions';

// Serving frameworks listed below:
// https://developers.google.com/analytics/devguides/platform/experiments#serving-framework
const servingFramework = 'API';

// Invalid URLs are used when user is not redirected when showing an experiment
// Read more: http://goo.gl/oVwKH1
const variations = [
  {name: 'Default', url: 'http://www.example.com', status: 'ACTIVE'},
  {name: 'variation 1', url: 'http://www.1.com', status: 'ACTIVE'},
  {name: 'variation 2', url: 'http://www.2.com', status: 'ACTIVE'},
];

async function runSample() {
  const res = await analytics.management.experiments.insert({
    accountId: 'your-accountId',
    webPropertyId: 'your-webPropertyId',
    profileId: 'your-profileId',
    requestBody: {
      name: 'Example Experiment',
      status: 'READY_TO_RUN',
      objectiveMetric: objectiveMetric,
      servingFramework: servingFramework,
      variations: variations,
    },
  });
  console.log(res.data);
  return res.data;
}

const scopes = ['https://www.googleapis.com/auth/analytics'];

sampleClient
  .authenticate(scopes)
  .then(() => runSample())
  .catch(console.error);

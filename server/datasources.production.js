'use strict';

module.exports = {
  MongoDB: {
    name: 'MongoDB',
    connector: 'loopback-connector-mongodb',
    url: process.env.MONGOLAB_WHITE_URI
  },
  amazonS3: {
    name: 'amazonS3',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    acl: 'public-read',
    key: process.env.AMAZONS3_KEY,
    keyId: process.env.AMAZONS3_KEY_ID
  }
};

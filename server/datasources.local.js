'use strict';
module.exports = {
  'MongoDB': {
    'host': '',
    'port': 0,
    'url': '',
    'database': 'portal',
    'password': '',
    'name': 'MongoDB',
    'user': '',
    'connector': 'mongodb',
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

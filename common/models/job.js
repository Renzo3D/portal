'use strict';

const GeoPoint = require('loopback').GeoPoint;

module.exports = function (Job) {
    Job.near = function (lat, lng, radius = 50, callback) {

        Job.find({}, (err, jobs) => {
            const result = [];
            const from = new GeoPoint({ lat: lat, lng: lng });
            jobs.forEach(job => {
                const lat1 = parseFloat(job.location.latitude);
                const lng1 = parseFloat(job.location.longitude);
                const to = new GeoPoint({ lat: lat1, lng: lng1 });
                const jobDist = from.distanceTo(to, { type: 'miles' });
                if (radius > jobDist) {
                    result.push(job);
                }
            });
            callback(null, result);
        });
    }

    Job.remoteMethod('near',
        {
            http: { path: '/near', verb: 'get' },
            description: 'Returns all jobs within a radius of the given coordinates. Defaults to 50 miles if radius is not provided',
            accepts: [{ arg: 'lat', type: 'number', required: true },
            { arg: 'lng', type: 'number', required: true },
            { arg: 'radius', type: 'number', required: false }
            ],
            returns: {
                arg: 'jobs', type: 'array'
            }
        })

};



'use strict';
const GeoPoint = require('loopback').GeoPoint;

module.exports = function (Student) {

    Student.near = function (lat, lng, radius = 50, callback) {

        Student.find({}, (err, students) => {
            const result = [];
            const from = new GeoPoint({ lat: lat, lng: lng });
            students.forEach(student => {
                const lat1 = parseFloat(student.location.latitude);
                const lng1 = parseFloat(student.location.longitude);
                const to = new GeoPoint({ lat: lat1, lng: lng1 });
                const studentDist = from.distanceTo(to, { type: 'miles' });
                if (radius > studentDist) {
                    result.push(student);
                }
            });
            callback(null, result);
        });
    }

    Student.remoteMethod('near',
        {
            http: { path: '/near', verb: 'get' },
            description: 'Returns all students within a radius of the given coordinates. Defaults to 50 miles if radius is not provided',
            accepts: [{ arg: 'lat', type: 'number', required: true },
            { arg: 'lng', type: 'number', required: true },
            { arg: 'radius', type: 'number', required: false }
            ],
            returns: {
                arg: 'students', type: 'array'
            }
        })
};
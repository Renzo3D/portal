'use strict';
const GeoPoint = require('loopback').GeoPoint;

module.exports = function(Company) {

    Company.near = function (lat, lng, radius = 50, callback) {

        Company.find({}, (err, companies) => {
            const result = [];
            const from = new GeoPoint({lat: lat, lng: lng});
            companies.forEach(company => {
                for (let i = 0; i < company.location.length; i++) {
                    const loc = company.location[i];
                    const to = new GeoPoint({lat: loc.latitude, lng: loc.longitude});
                    const companyDist = from.distanceTo(to, {type: 'miles'});
                    if (radius > companyDist) {
                        result.push(company);
                        break;
                    }

                }
            });
            callback(null, result);
        });
    }

    Company.remoteMethod('near',
        {
            http: { path: '/near', verb: 'get' },
            description: 'Returns all companies within a radius of the given coordinates. Defaults to 50 miles if radius is not provided',
            accepts: [{ arg: 'lat', type: 'number', required: true },
            { arg: 'lng', type: 'number', required: true },
            { arg: 'radius', type: 'number', required: false }
            ],
            returns: {
                arg: 'companies', type: 'array'
            }
        })

};

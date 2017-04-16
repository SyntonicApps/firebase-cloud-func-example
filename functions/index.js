const functions = require('firebase-functions');
const GeoFire = require('geofire');

exports.hello = functions.https.onRequest((request, response) => {
    response.send('Hello from firebase-functions!');
});

exports.geofire = functions.database.ref('/objects/{pushId}/location').onWrite(event => {
    const data = event.data;
    const locationsRef = data.ref.root.child('locations');
    const geoFire = new GeoFire(locationsRef);

    const parentKey = data.ref.parent.key;

    console.log(`Setting GeoFire for key: ${parentKey} to location: ${data.val()}`);

    return geoFire.set(parentKey, data.val());
});

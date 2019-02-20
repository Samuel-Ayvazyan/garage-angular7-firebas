const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// To keep lastCheckOutDate accurated with Server time we need to update it on back-end side.
exports.onCheckedOutChange = functions.firestore
    .document('devices/{device}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();
        if( newValue.isCheckedOut != previousValue.isCheckedOut && newValue.isCheckedOut === true ) {
            return db.collection('devices').doc(context.params.device).update(
                {'lastCheckOutDate': context.timestamp}
            );
        }
});

// As Firestore doesn't support auto-incrementing ID, we need to have it organized on back-end side.
exports.onDeviceCreateUpdateID = functions.firestore
    .document('devices/{device}')
    .onCreate((snapshot, context) => {
        return db.collection('devices')
            .orderBy('id', 'desc')
            .limit(1)
            .get().then(function(snap) {
                var maxID = 1;
                snap.forEach(function(childSnapshot) {
                    maxID = childSnapshot.data().id >= maxID ? childSnapshot.data().id + 1 : maxID;
                })
                return db.collection('devices').doc(context.params.device).update(
                    { "id": maxID }
                );
            });
});

// As Firestore rules support only atomic value comparission,
// we will keep quantity of Devices in separate atomic field to use it in a Rules.
exports.numberOfDevicesOnCreate = functions.firestore
    .document('devices/{device}')
    .onCreate((snapshot, context) => {
        db.collection('devices').get().then(snap => {
            db.collection('configs').doc('numberOfDevices').set(
                { "length": snap.size }
            );
        });
});
exports.numberOfDevicesOnDelete = functions.firestore
    .document('devices/{device}')
    .onDelete((snapshot, context) => {
        db.collection('devices').get().then(snap => {
            db.collection('configs').doc('numberOfDevices').set(
                { "length": snap.size }
            );
        });
});
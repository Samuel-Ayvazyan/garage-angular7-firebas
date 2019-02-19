const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

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
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
            db.collection('devices').doc(context.params.device).update(
                {'lastCheckOutDate': context.timestamp}
            );
        }
});
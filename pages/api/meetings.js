import db from '../../lib/firebase-admin';

export default async (_, res) => {
    const snapshot = await db.collection('meetings').get();
    const meetings = [];

    snapshot.forEach((doc) => {
        meetings.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ meetings });
};
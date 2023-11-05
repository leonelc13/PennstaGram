const { getDb } = require('./DB');

const getUserById = async (name) => {
    const db = getDb();
    try {
        const res = await db.collection('User').findOne({ username: name });
        // console.log(`User: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding profile for user ${name}.`);
    }
}

const updateUser = async (userid, body) => {
    const db = getDb();
    try {
        const res = await db.collection('User').updateOne({_id: userid}, {$set: body});
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating user ${userid}.`);
    }
}

const followUser = async (currentUser, targetUser) => {
    const db = getDb();
    try {
        const res = await db.collection('User').updateOne({ username: currentUser }, { $push: { following: targetUser } });
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error updating user ${currentUser}.`);
    }
}

const unfollowUser = async (currentUser, targetUser) => {
    const db = getDb();
    try {

        //get the following list of the current user in MongoDB
    
        let currentFollowing = await db.collection('User').findOne({ username: currentUser }).select('following');
        let targetFollower = await db.collection('User').findOne({ username: targetUser }).select('followers');
        
        //remove the target user from the following list of the current user
        var index = currentFollowing.indexOf(targetUser);
        if (index > -1) {
            currentFollowing.splice(index, 1);
        }
        //update only the following field of the current user
        await db.collection('User').updateOne({ username: currentUser }, { $set: { "following": currentFollowing } });

        //remove the current user from the follower list of the target user
        const follower_index = targetFollower.indexOf(currentUser);
        if (follower_index > -1) {
            targetFollower.splice(follower_index, 1);
        }

        //update target user 
        await db.collection('User').updateOne({ username: targetUser }, { $set: { "followers": targetFollower } }); 

    } catch (err){

    }
}


module.exports = {
    getUserById,
    updateUser,
    followUser,
    unfollowUser
}
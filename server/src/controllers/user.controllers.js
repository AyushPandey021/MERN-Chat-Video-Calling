import FriendRequest from "../models/FriendRequest.model.js";
import User from "../models/user.model.js";

// Get recommended users
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude the current user
        { _id: { $nin: currentUser.friends } }, // Exclude friends of the current user
        { isOnboarded: true },
      ],
    });

    res.status(200).json({ recommendedUsers });
  } catch (error) {
    console.error("Error in getting recommended users:", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

// Get my friends
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error("Error in getting my friends:", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    const recipient = User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const exitingUser = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (exitingUser) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sending friend request:", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id) {
      return res.status(403).json({
        message:
          "Unauthorized - You are not authorized to accept this friend request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in accepting friend request:", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

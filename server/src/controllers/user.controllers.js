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
    console.error("Error in getting recommended users:", error);
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
    console.error("Error in getting my friends:", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

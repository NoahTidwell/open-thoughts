const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controllers");

//use api/users

router
  .route("/")

  .get(getAllUsers)

  .post(createUser);

//use api/users/id:

router
  .route("/:id")

  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//use api/users/:userId/friends/:friendId

router
  .route("/:id/friends/:friendsId")

  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
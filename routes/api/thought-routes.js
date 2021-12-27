const router = require("express").Router();
const thoughtController = require("../../controllers/thought-controllers");

const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controllers");

//use api/thoughts

router
  .route("/")

  .get(getAllThoughts)
  .post(addThoughts);
//use api/thoughts/:id
router
  .route("/:id")
  .put(updateThoughts)
  .get(getThoughtsById)
  .delete(deleteThoughts);

//use api/thoughts/:userId

router
  .route("/:userId")

  .post(addThoughts);

//use api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions/")

  .post(addReaction);

//use api/thoughts/:thoughtId/reactionId
router
  .route("/:thoughtId/reactions/:reactionId")

  .delete(deleteReaction);

module.exports = router;
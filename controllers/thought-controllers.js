const { Thoughts, User } = require("../models");

const thoughtController = {
    
  // Get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get thoughts by ID
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought match with this ID " });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create new thought
  addThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          {
            $push: { thoughts: _id },
          },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought match with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Update thought
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404), json({ message: "No thought match with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create Reaction
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought match with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Find a thought and Delete
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought match with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Find reaction and delete

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought match with this ID" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
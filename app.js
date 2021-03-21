const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/newmithun", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection Successfulll"))
  .catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

const createDocument = async () => {
  try {
    const expressPlayList = new Playlist({
      name: "Express JS",
      ctype: "Back End",
      videos: 80,
      author: "Mithun",
      active: true,
    });
    const mongoosePlayList = new Playlist({
      name: "Mongoose",
      ctype: "Back End",
      videos: 60,
      author: "Mithun",
      active: true,
    });
    const reactPlayList = new Playlist({
      name: "React JS",
      ctype: "Front End",
      videos: 50,
      author: "Mithun",
      active: true,
    });
    const dbPlayList = new Playlist({
      name: "MongoDB",
      ctype: "Back End",
      videos: 40,
      author: "Mithun",
      active: true,
    });
    const result = await Playlist.insertMany([
      dbPlayList,
      reactPlayList,
      mongoosePlayList,
      expressPlayList,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist.find({ author: "Mithun" })
      .select({
        name: 1,
      })
      .sort({ name: 1 });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      { $set: [{ name: "Javascript" }, { ctype: "Full Stack" }] },
      { new: true }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

updateDocument("6057270285410a1a8457dc0d");

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

deleteDocument("6057270285410a1a8457dc0d");

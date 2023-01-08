const { default: mongoose } = require("mongoose");

const LecturerSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: null,
  },
  nidn: {
    type: String,
    required: null,
  },
  email: {
    type: String,
    required: null,
  }
});

const Lecturer = mongoose.model("Lecturer", LecturerSchema);

module.exports = { Lecturer };

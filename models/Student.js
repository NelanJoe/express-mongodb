const { default: mongoose } = require("mongoose");

const StudentSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: null,
  },
  nim: {
    type: String,
    required: null,
  },
  email: {
    type: String,
    required: null,
  },
  jurusan: {
    type: String,
    required: null,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = { Student };

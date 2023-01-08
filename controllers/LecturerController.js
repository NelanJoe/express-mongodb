const { validationResult } = require("express-validator");
const {
  success,
  error,
  errorDelete,
  successDelete,
} = require("../helpers/ApiFormatter");

const { Lecturer } = require("../models/Lecturers");

class LecturersController {
  async index(req, res) {
    const lecturers = await Lecturer.find();

    if (!lecturers) {
      res.status(200).json(error(404, "Data not found"));
      return;
    }

    res.status(200).json(success(200, "Get all data lecturers", lecturers));
  }

  async show(req, res) {
    const { id } = req.params;

    const lecture = await Lecturer.findById(id);

    if (!lecture) {
      res.status(200).json(error(404, "Data not found"));
      return;
    }

    res.status(200).json(success(200, "Get data lecturer", lecture));
  }

  async store(req, res) {
    const { nama, nidn, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(error(400, errors.array()));
      return;
    }

    const input = {
      nama,
      nidn,
      email,
    };

    const lecturer = await (await Lecturer.create(input)).save();

    res
      .status(201)
      .json(success(201, "Succesfully created new lecturer", lecturer));
  }

  async update(req, res) {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(error(400, errors.array()));
      return;
    }

    await Lecturer.updateOne({ _id: id }, { $set: { ...req.body } });

    const updateLecturer = await Lecturer.findById(id);

    res
      .status(200)
      .json(success(200, "Succesfully update lecturer", updateLecturer));
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Lecturer.findByIdAndDelete(id);

    res.status(200).json(successDelete(200, "Succesfully delete lecturer"));
  }
}

module.exports = new LecturersController();

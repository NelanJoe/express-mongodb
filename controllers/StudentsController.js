const { validationResult } = require("express-validator");
const { success, error } = require("../helpers/ApiFormatter");
const { Student } = require("../models/Student");

class StudentController {
  /**
   * @route GET /api/students
   * @desc Get all data students
   * */
  async index(req, res) {
    const students = await Student.find();

    if (!students) {
      res.status(200).json(error(404, "Data not found"));
      return;
    }

    res.status(200).json(success(200, "Get all data students", students));
  }

  /**
   * @route GET /api/students/:id
   * @desc Get data student by id
   * */
  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      res.status(200).json(error(404, "Data not found"));
      return;
    }

    res.status(200).json(success(200, "Get data student", student));
  }

  /**
   * @route POST /api/students
   * @desc Create new student
   */
  async store(req, res) {
    const { nama, nim, email, jurusan } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(error(400, errors.array()));
      return;
    }

    const input = {
      nama,
      nim,
      email,
      jurusan,
    };

    const student = await (await Student.create(input)).save();

    res
      .status(201)
      .json(success(201, "Succesfully created new Student", student));
  }

  /**
   * @route PUT /api/students/:id
   * @desc Update student by id
   */
  async update(req, res) {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(error(400, errors.array()));
      return;
    }

    await Student.updateOne({ _id: id }, { $set: { ...req.body } });

    const updateStudent = await Student.findById(id);

    res
      .status(201)
      .json(success(201, "Succesfully update Student", updateStudent));
  }

  /**
   * @route DELETE /api/students/:id
   * @desc Delete student by id
   * */
  async destroy(req, res) {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json(success(200, "Succesfully delete Student"));
  }
}

const object = new StudentController();

module.exports = object;

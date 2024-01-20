import ProblemModel from "../../../DB/Model/Problem.Model.js";
//userID: req.user._id

export const createProblem = async (req, res) => {
  try {
    const newProblem = await ProblemModel.create(req.body);
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUserProblem = async (req, res) => {
  try {
    const user = await ProblemModel.findOne({ user_id: req.params });

    if (user) {
      const problem = user.problem;
      res.status(200).json(problem);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

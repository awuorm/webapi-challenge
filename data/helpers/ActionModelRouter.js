const express = require("express");
const router = express.Router();
const dbActionModel = require("./actionModel");
const dbProjectsModel = require("./projectModel");
//const projectChecker = require("./projectModelRouter");

router.get("/:id", validateID, handleActionsGet);
router.post("/",validateProject, handleActionPost);
router.put("/:id", validateID, handleActionEdit);
router.delete("/:id", validateID, handleActionDelete);

function handleActionDelete(req, res) {
  const { id } = req.params;
  dbActionModel
    .remove(id)
    .then(data => {
      console.log("hello from actionmodels", data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log("hello from actionmodels", error);
      res.status(500).json(error);
    });
}

function handleActionEdit(req, res) {
  const { id } = req.params;
  const action = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };
  dbActionModel
    .update(id, action)
    .then(data => {
      console.log("hello from actionmodels", data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleActionPost(req, res) {
  const action = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };
  dbActionModel
    .insert(action)
    .then(data => {
      console.log("hello from actionmodels", data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleActionsGet(req, res) {
  const { id } = req.params;
  dbActionModel
    .get(id)
    .then(data => {
      console.log("hello from actionmodels", data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

//custom middleware

function validateID(req, res, next) {
  const { id } = req.params;
  if (Number(id)) {
    next();
  } else {
    res
      .status(400)
      .json({ Error: "Please provide a valid id,an id can only be a number" });
  }
}

function validateProject (req, res, next) {
  const id = req.body.project_id;
  dbProjectsModel
    .get(id)
    .then(data => {
      if (data === null) {
        res
          .status(400)
          .json({
            ErrorMessage:
              "This project cannot be found,please provide a valid project id"
          });
      } else {
        console.log(data);
        req.project = data;
        next();
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

module.exports = router;

const express = require("express");
const dbProjectsModel = require("./projectModel");
const dbActionModel = require("./actionModel");
const router = express.Router();

router.get("/", handleAllProjectGet);
router.post("/", handleProjectPost);
router.get("/:id",validateID, handleProjectByIdGet);
router.get("/:id/actions",validateID, handleProjectActionsGet);
router.put("/:id",validateID, handleProjectEdit);
router.delete("/:id",validateID, handleProjectDelete);

function handleProjectActionsGet(req, res) {
    const { id } = req.params;
    dbProjectsModel
      .getProjectActions(id)
      .then(data => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  }

function handleProjectDelete(req, res) {
  const { id } = req.params;
  dbProjectsModel
    .remove(id)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(200).json(error);
    });
}

function handleProjectEdit(req, res) {
  const { id } = req.params;
  const project = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };
  dbProjectsModel
    .update(id, project)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(200).json(error);
    });
}

function handleProjectPost(req, res) {
  const project = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };
  dbProjectsModel
    .insert(project)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(200).json(error);
    });
}

function handleProjectByIdGet(req, res) {
  const { id } = req.params;
  dbProjectsModel
    .get(id)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleAllProjectGet(req, res) {
  dbProjectsModel
    .get()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function validateID(req,res,next) {
    const {id} = req.params;
    if (Number(id)){
        next();
    }
    else{
        res.status(400).json({Error: "Please provide a valid id,an id can only be a number"})
    }
}

function ValidateProject(req,res,next) {
    const { id } = req.params;
  dbProjectsModel
    .get(id)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

module.exports = router;

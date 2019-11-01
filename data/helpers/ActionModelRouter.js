const express = require("express");
const router = express.Router();
const dbActionModel = require("./actionModel");

router.get("/", handleActionsGet);
router.post("/", handleActionPost);
router.put("/:id", handleActionEdit);
router.delete("/:id", handleActionDelete);

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
    })
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

module.exports = router;

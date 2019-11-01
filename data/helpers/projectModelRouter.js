const express = require("express");
const dbProjectsModel = require("./projectModel");
const router = express.Router();

router.get("/",handleAllProjectGet);
router.get("/:id",handleProjectByIdGet);

function handleProjectByIdGet(req,res) {
    const {id} = req.params;
    dbProjectsModel.get(id)
                   .then(data => {
                       console.log(data);
                       res.status(200).json(data);
                   })
                   .catch(error => {
                    console.log(error);
                    res.status(500).json(error);                       
                   })
}

function handleAllProjectGet(req,res) {
    dbProjectsModel.get()
                   .then(data => {
                       console.log(data);
                       res.status(200).json(data);
                   })
                   .catch(error => {
                    console.log(error);
                    res.status(500).json(error);                       
                   })
}

module.exports = router;
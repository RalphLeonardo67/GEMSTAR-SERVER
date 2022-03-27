const express = require("express");
const router = express.Router();
const { projectController } = require("../controller");
const fileUpload = require("./../helpers/projectFile");
const uuidv4 = require("uuid");
const { loggerModule } = require("../middleware/accessControll");

router.post(
  "/create",
  (req, res, next) => {
    req.projectId = uuidv4.v4();
    next();
  },
  fileUpload.array("file"),
  loggerModule("CREATE_PROJECT"),
  (req, res) => {
    const projectId = req.projectId;
    const file = req.files;
    const { userId } = req.session;
    Promise.all([
      projectController.createProject({ ...req.body, projectId, userId }),
      projectController.createProjectFileUpload(projectId, file),
    ])
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        res.status(400).send({ success: false, message: err.message });
      });
  }
);

router.get("/status/fetch", (req, res) => {
  projectController.fetchStatus().then((response) => {
    res.send(response);
  });
});

router.post("/status/:projectId/create", (req, res) => {
  const { remarks } = req.body;
  const { projectId, statusId } = req.params;
  const userId = req.session.userId;
  projectController
    .createProjectStatus(projectId, userId, statusId, remarks)
    .then((response) => {
      res.send({ success: true, data: response });
    });
});

router.get("/:projectId/status/fetch", (req, res) => {
  const { projectId } = req.params;
  projectController.fetchProjectStatus(projectId).then((response) => {
    res.send({ success: true, data: response });
  });
});

router.post("/comment/create", (req, res) => {
  const commentId = uuidv4.v4();
  const userId = req.session.userId;
  const { projectId, comment_content } = req.body;
  projectController
    .createComment(commentId, projectId, userId, comment_content)
    .then((projectComments) => {
      res.send({ success: true, projectComments });
    });
});

router.post("/qoutation/detail", (req, res) => {
  const qoutationId = uuidv4.v4();
  const { customer, address, engine_model, serial_number, projectId } =
    req.body;

  projectController
    .createQoutationDetails(
      qoutationId,
      customer,
      address,
      engine_model,
      serial_number,
      projectId
    )
    .then((result) => {
      res.send({ success: true, data: result });
    });
});

router.post("/quotation/services", (req, res) => {
  const {
    project_qoutation_detail_id,
    quantity,
    unit,
    services_id,
    services_name,
    unit_price,
    price,
  } = req.body;

  const project_qoutation_id = uuidv4.v4();

  projectController
    .createQoutationServices(
      project_qoutation_id,
      project_qoutation_detail_id,
      quantity,
      unit,
      services_id,
      services_name,
      unit_price,
      price
    )
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
});

router.put(
  "/quotation/:projectId/:project_qoutation_detail_id/show",
  (req, res) => {
    const { projectId, project_qoutation_detail_id } = req.params;
    projectController
      .showQoutation(projectId, project_qoutation_detail_id)
      .then((result) => {
        res.send({ success: true, data: result });
      });
  }
);

router.put(
  "/quotation/:projectId/:project_qoutation_detail_id/final",
  (req, res) => {
    const { projectId, project_qoutation_detail_id } = req.params;
    projectController
      .finalizeQoutation(projectId, project_qoutation_detail_id)
      .then((result) => {
        res.send({ success: true, data: result });
      });
  }
);

router.get("/fetch", (req, res) => {
  const userId = req.session.userId;
  const { user_level_acc } = req.session.user;
  projectController.fetchProject(userId, user_level_acc).then((result) => {
    res.send({ success: true, data: result });
  });
});

router.get("/fetch/admin", (req, res) => {
  projectController.fetchProjectAsAdmin().then((result) => {
    res.json({ success: true, data: result });
  });
});

router.get("/fetch/:projectId", (req, res) => {
  const { projectId } = req.params;
  Promise.all([
    projectController.fetchProjectDetails(projectId),
    projectController.fetchProjectFiles(projectId),
    projectController.fetchComments(projectId),
    projectController.fetchQuotationDetails(projectId),
  ]).then(
    ([projectDetails, projectFiles, projectComments, projectQuotation]) => {
      res.send({
        success: true,
        projectDetails,
        projectFiles,
        projectComments,
        projectQuotation,
      });
    }
  );
});

router.put("/employee/assign/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  projectController.assignEmployee(userId, projectId).then((projectDetails) => {
    res.send({ success: true, projectDetails });
  });
});

router.get("/download/:projectId/:fileName", (req, res) => {
  const { projectId, fileName } = req.params;
  const path = `${process.env.PROJECT_DIR}/${projectId}/${fileName}`;
  res.download(path);
});

module.exports = router;

const { executeScript } = require("../model/mysql/utils");
const projectQuery = require("../model/mysql/query/project");

const assignEmployee = (employee_id, projectId) => {
  return executeScript(
    projectQuery.assignEmployee(employee_id, projectId)
  ).then(() => {
    return fetchProjectDetails(projectId);
  });
};

const createProject = (props) => {
  const {
    projectId,
    project_name,
    project_description,
    start_date,
    end_date,
    userId,
  } = props;
  return executeScript(
    projectQuery.createProject(
      projectId,
      project_name,
      project_description,
      start_date,
      end_date,
      userId
    )
  );
};

const createComment = (commentId, projectId, userId, comment_content) => {
  return executeScript(
    projectQuery.createComment(commentId, projectId, userId, comment_content)
  ).then(() => {
    return fetchComments(projectId);
  });
};

const createQoutationDetails = (
  qoutationId,
  customer,
  address,
  engine_model,
  serial_number,
  projectId
) => {
  return executeScript(
    projectQuery.createQoutationDetails(
      qoutationId,
      customer,
      address,
      engine_model,
      serial_number,
      projectId
    )
  ).then(() => {
    return fetchQuotationDetails(projectId);
  });
};

const fetchQoutationServices = (project_qoutation_detail_id) => {
  return executeScript(
    projectQuery.fetchQoutationServices(project_qoutation_detail_id)
  );
};

const fetchStatus = () => {
  return executeScript(projectQuery.fetchStatus());
};

const createProjectStatus = (projectId, usersId, statusId, remarks) => {
  return executeScript(
    projectQuery.createProjectStatus(projectId, usersId, statusId, remarks)
  );
};

const fetchProjectStatus = (projectId) => {
  return executeScript(projectQuery.fetchProjectStatus(projectId));
};

const fetchQuotationDetails = (projectId) => {
  return executeScript(projectQuery.fetchQuotationDetails(projectId))
    .then((res) => res[0])
    .then((res) => {
      if (!!res) {
        return fetchQoutationServices(res.project_qoutation_detail_id).then(
          (services) => {
            const totalAmount = services.reduce(
              (acc, cur) => acc + cur.price,
              0
            );
            return { ...res, totalAmount, services };
          }
        );
      } else {
        return {};
      }
    });
};

const createQoutationServices = (
  project_qoutation_id,
  project_qoutation_detail_id,
  quantity,
  unit,
  services_id,
  services_name,
  unit_price,
  price
) => {
  return executeScript(
    projectQuery.checkServicesExist(project_qoutation_detail_id, services_name)
  )
    .then((res) => {
      if (res.length > 0) {
        throw new Error("Service Already Exist");
      }
      return executeScript(
        projectQuery.createQoutationServices(
          project_qoutation_id,
          project_qoutation_detail_id,
          quantity,
          unit,
          services_id,
          services_name,
          unit_price,
          price
        )
      ).then(() => {
        return fetchQoutationServices(project_qoutation_detail_id);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const fetchComments = (projectId) => {
  return executeScript(projectQuery.fetchComments(projectId));
};

const createProjectFileUpload = (projectId, file) => {
  return executeScript(projectQuery.createProjectFileUpload(projectId, file));
};

const fetchProject = (userId, user_level_acc) => {
  if (user_level_acc === "emp") {
    return executeScript(projectQuery.fetchProjectEmployee(userId)).then(
      (res) => res
    );
  }
  return executeScript(projectQuery.fetchProject(userId)).then((res) => res);
};

const fetchProjectAsAdmin = () => {
  return executeScript(projectQuery.fetchProjectAsAdmin()).then((res) => res);
};

const fetchProjectDetails = (projectId) => {
  return executeScript(projectQuery.fetchProjectDetails(projectId)).then(
    (res) => res[0]
  );
};

const fetchProjectFiles = (projectId) => {
  return executeScript(projectQuery.fetchProjectFiles(projectId)).then(
    (res) => res
  );
};

const showQoutation = (projectId, project_qoutation_detail_id) => {
  return executeScript(
    projectQuery.showQoutation(project_qoutation_detail_id)
  ).then(() => {
    return fetchQuotationDetails(projectId);
  });
};

const finalizeQoutation = (projectId, project_qoutation_detail_id) => {
  return Promise.all([
    executeScript(projectQuery.finalizeQoutation(project_qoutation_detail_id)),
    executeScript(projectQuery.updateProjectStatus(2, projectId)),
  ]).then(() => {
    return fetchQuotationDetails(projectId);
  });
};

module.exports = {
  assignEmployee,
  createComment,
  createProject,
  createProjectFileUpload,
  createProjectStatus,
  createQoutationDetails,
  createQoutationServices,
  fetchComments,
  fetchProject,
  fetchProjectAsAdmin,
  fetchProjectDetails,
  fetchProjectFiles,
  fetchProjectStatus,
  fetchQuotationDetails,
  fetchQoutationServices,
  fetchStatus,
  finalizeQoutation,
  showQoutation,
};

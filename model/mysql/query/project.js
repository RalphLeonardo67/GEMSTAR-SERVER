const uuidv4 = require("uuid");

const fetchStatus = () => {
  const query = `SELECT * FROM status`;
  return {
    sql: query,
    values: [],
  };
};

const createProject = (
  projectId,
  project_name,
  project_description,
  start_date,
  end_date,
  userId
) => {
  const query = `INSERT INTO project
    (project_id, project_name, project_description, users_id, start_date, end_date, date_created)
    VALUES
    (?, ?, ?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [
      projectId,
      project_name,
      project_description,
      userId,
      start_date,
      end_date,
      Date.now(),
    ],
  };
};

const createProjectFileUpload = (projectId, file) => {
  const now = Date.now();
  const insertValueString = file
    .map((res) => {
      return `(?, ?, ?, ?, ?, ?)`;
    })
    .join(", ");

  const values = file.reduce((acc, cur) => {
    return [
      ...acc,
      uuidv4.v4(),
      projectId,
      now,
      cur.filename,
      cur.originalname,
      cur.destination,
    ];
  }, []);

  const query = `INSERT INTO project_file
  (project_file_id, project_id, date_uploaded, file_name, original_file_name, file_path)
  VALUES
  ${insertValueString}`;

  return {
    sql: query,
    values,
  };
};

const fetchProjectAsAdmin = () => {
  const query = `SELECT project_id, project_name, project_description, project.users_id, start_date, end_date, date_created, project.status_id,
    users.first_name, users.last_name,
    status.status_acr, status.status_name
    FROM project
    LEFT JOIN status
    ON project.status_id = status.status_id
    LEFT JOIN users
    ON project.users_id = users.users_id;`;
  return {
    sql: query,
    values: [],
  };
};

const fetchProject = (userId) => {
  const query = `SELECT project_id, project_name, project_description, project.users_id, start_date, end_date, date_created, project.status_id,
    users.first_name, users.last_name,
    status.status_acr, status.status_name
    FROM project
    LEFT JOIN status
    ON project.status_id = status.status_id
    LEFT JOIN users
    ON project.users_id = users.users_id
    WHERE project.users_id	= ?`;
  return {
    sql: query,
    values: [userId],
  };
};

const fetchProjectEmployee = (userId) => {
  userId;
  const query = `SELECT project_id, project_name, project_description, project.users_id, start_date, end_date, date_created, project.status_id,
    users.first_name, users.last_name,
    status.status_acr, status.status_name
    FROM project
    LEFT JOIN status
    ON project.status_id = status.status_id
    LEFT JOIN users
    ON project.users_id = users.users_id
    WHERE project.employee_id = ?`;
  return {
    sql: query,
    values: [userId],
  };
};

const fetchProjectDetails = (projectId) => {
  const query = `SELECT tbl1.project_id, tbl1.project_name, tbl1.project_description, tbl1.users_id, tbl1.employee_id, tbl1.start_date, tbl1.end_date, tbl1.date_created, tbl1.status_id,
      tbl1.first_name, tbl1.last_name, tbl1.address,
      tbl1.status_acr, tbl1.status_name,
      users.first_name as emp_first_name, users.last_name as emp_last_name, users.middle_name as emp_middle_name
    FROM (SELECT project_id, project_name, employee_id, project_description, project.users_id, start_date, end_date, date_created, project.status_id,
      users.first_name, users.last_name, users.address,
      status.status_acr, status.status_name
      FROM project
      LEFT JOIN status
      ON project.status_id = status.status_id
      LEFT JOIN users
      ON project.users_id = users.users_id
      WHERE project_id = ?) as tbl1
    LEFT JOIN users
    ON tbl1.employee_id = users.users_id;`;
  return {
    sql: query,
    values: [projectId],
  };
};

const createProjectStatus = (projectId, usersId, statusId, remarks) => {
  const query = `INSERT INTO project_status
    (project_status_id, project_id, employee_id, status_id, date_created, remarks) 
      VALUES 
    (?, ?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [uuidv4.v4(), projectId, usersId, statusId, Date.now(), remarks],
  };
};

const fetchProjectStatus = (projectId) => {
  const query = `SELECT project_status_id, project_id, date_created, remarks,
    project_status.status_id, status.status_name, status.status_acr,
    project_status.employee_id, users.first_name, users.last_name
    FROM project_status
    LEFT JOIN status
    ON project_status.status_id = status.status_id
    LEFT JOIN users
    ON project_status.employee_id = users.users_id
    WHERE project_status.project_id = ?
    ORDER BY date_created DESC`;

  return {
    sql: query,
    values: [projectId],
  };
};

const fetchProjectFiles = (projectId) => {
  const query = `SELECT * FROM project_file where project_id = ?`;
  return {
    sql: query,
    values: [projectId],
  };
};

const createComment = (commentId, projectId, userId, comment_content) => {
  const query = `INSERT INTO comment(comment_id, project_id, users_id, comment_content, date_created)
      VALUES
      (?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [commentId, projectId, userId, comment_content, Date.now()],
  };
};

const createQoutationDetails = (
  qoutationId,
  customer,
  address,
  engine_model,
  serial_number,
  projectId
) => {
  const query = `INSERT INTO project_qoutation_detail
    (project_qoutation_detail_id, date, customer, address, engine_model, serial_number, project_id, is_final, is_show)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [
      qoutationId,
      Date.now(),
      customer,
      address,
      engine_model,
      serial_number,
      projectId,
      0,
      0,
    ],
  };
};

const fetchQuotationDetails = (projectId) => {
  const query = `SELECT project_qoutation_detail_id, date, customer, address, engine_model, serial_number, project_id, is_final, is_show
    FROM project_qoutation_detail
    WHERE project_id = ?`;

  return {
    sql: query,
    values: [projectId],
  };
};

const checkServicesExist = (project_qoutation_detail_id, services_name) => {
  const query = `SELECT * FROM project_qoutation
    WHERE project_qoutation_detail_id = ? AND services_name = ?`;
  return {
    sql: query,
    values: [project_qoutation_detail_id, services_name],
  };
};

const assignEmployee = (employee_id, project_id) => {
  const query = `UPDATE project SET employee_id = ? 
WHERE project_id = ?`;
  return {
    sql: query,
    values: [employee_id, project_id],
  };
};

const showQoutation = (project_qoutation_detail_id) => {
  const query = `UPDATE project_qoutation_detail
  SET is_show = ?
  WHERE project_qoutation_detail_id = ?`;
  return {
    sql: query,
    values: [1, project_qoutation_detail_id],
  };
};

const finalizeQoutation = (project_qoutation_detail_id) => {
  const query = `UPDATE project_qoutation_detail
  SET is_final = ?
  WHERE project_qoutation_detail_id = ?`;

  return {
    sql: query,
    values: [1, project_qoutation_detail_id],
  };
};

const updateProjectStatus = (statusId, projectId) => {
  const query = `UPDATE project
    SET status_id= ?
    WHERE project_id = ?`;
  return {
    sql: query,
    values: [statusId, projectId],
  };
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
  const query = `
    INSERT INTO project_qoutation(project_qoutation_id, project_qoutation_detail_id, quantity, unit, services_id, services_name, unit_price, price, last_updated)
      VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return {
    sql: query,
    values: [
      project_qoutation_id,
      project_qoutation_detail_id,
      quantity,
      unit,
      services_id,
      services_name,
      unit_price,
      price,
      Date.now(),
    ],
  };
};

const fetchQoutationServices = (project_qoutation_detail_id) => {
  const query = `SELECT  project_qoutation_id, project_qoutation_detail_id, quantity, unit, services_id, services_name, unit_price, price, last_updated
    FROM project_qoutation
    WHERE project_qoutation_detail_id = ?`;

  return {
    sql: query,
    values: [project_qoutation_detail_id],
  };
};

const fetchComments = (projectId) => {
  const query = `SELECT comment_id, project_id, comment_content, date_created, comment.users_id, users.first_name, users.last_name
    FROM comment 
    LEFT JOIN users
    ON users.users_id = comment.users_id
    where project_id = ?
    `;

  return {
    sql: query,
    values: [projectId],
  };
};

const fetchAdminTable = () => {
  const query = `
    SELECT project.project_id, project_name, start_date, end_date, date_created,
      users.users_id, users.first_name, users.last_name, users.middle_name,
      project_qoutation_detail.engine_model, SUM(project_qoutation.price) AS total_price,
      status.status_acr, status.status_id, status.status_name
      FROM project
      LEFT JOIN users
      ON project.users_id = users.users_id
      LEFT JOIN project_qoutation_detail
      ON project.project_id = project_qoutation_detail.project_id
      LEFT JOIN project_qoutation
      ON project_qoutation_detail.project_qoutation_detail_id = project_qoutation.project_qoutation_detail_id
      LEFT JOIN status
      ON project.status_id = status.status_id
  `;
  return {
    sql: query,
    values: [],
  };
};

module.exports = {
  createComment,
  createProject,
  createProjectFileUpload,
  createProjectStatus,
  createQoutationDetails,
  createQoutationServices,
  checkServicesExist,
  assignEmployee,
  fetchAdminTable,
  fetchComments,
  fetchProject,
  fetchProjectAsAdmin,
  fetchProjectDetails,
  fetchProjectEmployee,
  fetchProjectFiles,
  fetchProjectStatus,
  fetchQuotationDetails,
  fetchQoutationServices,
  fetchStatus,
  finalizeQoutation,
  updateProjectStatus,
  showQoutation,
};

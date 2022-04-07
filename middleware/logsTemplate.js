const uuidv4 = require("uuid");

const { createLogs } = require("../controller/app");

module.exports = {
  REGISTRATION: (props, LOGTYPE, session) => {
    const logsId = uuidv4.v4();
    const { email } = props;
    const remarks = `${email} has REGISTERED`;
    createLogs(logsId, LOGTYPE, remarks);
  },
  LOGIN: (props, LOGTYPE, session) => {
    const logsId = uuidv4.v4();
    const { email } = props;
    const remarks = `${email} has LOGGED-IN`;
    createLogs(logsId, LOGTYPE, remarks);
  },
  LOGOUT: (props, LOGTYPE, session) => {
    const logsId = uuidv4.v4();
    const { email } = session;
    const remarks = `${email} has LOGGED-OUT`;
    createLogs(logsId, LOGTYPE, remarks);
  },
  CREATE_PROJECT: (props, LOGTYPE, session) => {
    const logsId = uuidv4.v4();
    const { project_name } = props;
    const remarks = `Project ${project_name} has created`;
    createLogs(logsId, LOGTYPE, remarks);
  },
  EDIT_USER: (props, LOGTYPE, session) => {
    const logsId = uuidv4.v4();
    // const { project_name } = props;
    console.log(props);
    // const remarks = `Project ${project_name} has created`;
    // createLogs(logsId, LOGTYPE, remarks);
  },
};

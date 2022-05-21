const { executeScript } = require("../model/mysql/utils");
const appQuery = require("../model/mysql/query/app");

const createLogs = (logsId, logsType, remarks) => {
    return executeScript(appQuery.insertLogs(logsId, logsType, remarks));
};

const fetchLogs = () => {
    return Promise.all([
        executeScript(appQuery.fetchLogs(0, 25)),
        executeScript(appQuery.logsTotalCount()),
    ]).then(([data, total_count]) => {
        return { data, totalCount: total_count[0].total_count };
    });
};

module.exports = {
    createLogs,

};
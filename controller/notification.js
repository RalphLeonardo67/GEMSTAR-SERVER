const uuidv4 = require("uuid");
const notificationTemplate = require("../helpers/notificationTemplate");

const notificationQuery = require("../model/mysql/query/notification");
const { executeScript } = require("../model/mysql/utils");

const createNotification = (props) => {
  const { url_link, template_name, notified_by, notified_users } = props;
  const notificationId = uuidv4.v4();
  const date = Date.now();
  const content = notificationTemplate[template_name](props);
  return Promise.all(
    notified_users.map((notified_user) => {
      return executeScript(
        notificationQuery.createNotification(
          notificationId,
          content,
          url_link,
          date,
          notified_by,
          notified_user
        )
      );
    })
  );
};

const fetchNotification = (users_id) => {
  return Promise.all([
    executeScript(notificationQuery.fetchNotification(users_id)),
    executeScript(notificationQuery.countNotification(users_id)),
  ]).then(([data, total_count]) => {
    return { data, totalCount: total_count[0].count };
  });
};

const countNotification = (users_id) => {
  return executeScript(notificationQuery.countNotification(users_id));
};

const readNotification = (notificationId) => {
  return executeScript(notificationQuery.readNotification(notificationId));
};

const dismissNotification = (notificationId, users_id) => {
  return executeScript(
    notificationQuery.dismissNotification(notificationId)
  ).then(() => {
    return fetchNotification(users_id);
  });
};

module.exports = {
  createNotification,
  countNotification,
  dismissNotification,
  fetchNotification,
  readNotification,
};

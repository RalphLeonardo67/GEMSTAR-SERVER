const createNotification = (
  notification_id,
  content,
  url_link,
  date,
  notified_by,
  notified_user
) => {
  const query = `
    INSERT INTO
    notification(notification_id, content, url_link, date, notified_by, users_id )
    VALUES
    (?, ?, ?, ?, ?, ?)
  `;
  return {
    sql: query,
    values: [
      notification_id,
      content,
      url_link,
      date,
      notified_by,
      notified_user,
    ],
  };
};

const countNotification = (users_id) => {
  const query = `SELECT count(notification_id) as count
    FROM notification
    WHERE is_read = 0 AND is_dismiss = 0 AND users_id = ?
  `;
  return {
    sql: query,
    values: [users_id],
  };
};

const fetchNotification = (users_id) => {
  const query = `SELECT 
    notification_id, content, url_link, date, notified_by, users_id, is_read, is_dismiss
    FROM notification
    WHERE is_dismiss = 0 AND users_id = ?
  `;
  return {
    sql: query,
    values: [users_id],
  };
};

const readNotification = (notificationId) => {
  const query = `UPDATE notification SET is_read = 1  WHERE notification_id = ?`;
  return {
    sql: query,
    values: [notificationId],
  };
};

const dismissNotification = (notificationId) => {
  const query = `UPDATE notification SET is_dismiss = 1  WHERE notification_id = ?`;
  return {
    sql: query,
    values: [notificationId],
  };
};

module.exports = {
  createNotification,
  countNotification,
  dismissNotification,
  fetchNotification,
  readNotification,
};

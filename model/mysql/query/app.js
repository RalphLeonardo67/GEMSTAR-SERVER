const uploadCarousel = (
  carousel_id,
  users_id,
  caption,
  date_updated,
  is_inactive,
  file_name,
  file_destination
) => {
  const query = `INSERT INTO carousel
    (carousel_id, users_id, caption, date_updated, is_inactive, file_name, file_destination)
        VALUES
    (?, ?, ?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [email, email, password],
  };
};

const insertLogs = (logsId, logsType, remarks) => {
  const now = Date.now();
  const query = `INSERT INTO logs
    (logs_id, logs_type, created_at, remarks) 
      VALUES 
    (?, ?, ?, ?)`;
  return {
    sql: query,
    values: [logsId, logsType, now, remarks],
  };
};

const fetchLogs = (page = 0, sizePerPage = 25) => {
  const offset = page * sizePerPage;
  const query = `SELECT * FROM logs
    ORDER BY created_at DESC
    LIMIT ?,?`;
  return {
    sql: query,
    values: [offset, sizePerPage],
  };
};

const logsTotalCount = () => {
  const query = `SELECT COUNT(logs_id) AS total_count FROM logs`;
  return {
    sql: query,
    values: [],
  };
};

module.exports = {
  insertLogs,
  fetchLogs,
  logsTotalCount,
};

const uploadCarousel = (
  carouselData
) => {
  const now = Date.now();
  const query = `INSERT INTO carousel
    (carousel_id, users_id, caption, date_updated, is_inactive, file_name, file_destination)
        VALUES
    (?, ?, ?, ?, ?, ?, ?)`;
  return {
    sql: query,
    values: [carouselData.carousel_id, carouselData.users_id, carouselData.caption, now, carouselData.is_inactive, carouselData.filename, carouselData.file_destination ],
  };
};

const getAllCarousels = () => {
  const query = `SELECT * FROM carousel`;
  return {
    sql: query,
    values: [],
  };
};

const getAllActiveCarousels = () => {
  const query = `SELECT * FROM carousel WHERE is_inactive = ?`;
  return {
    sql: query,
    values: [1],
  };
};

const updateCarouselStatus = (id,is_inactive) => {
  const query = `UPDATE carousel SET is_inactive=? WHERE carousel_id=?`;
  return {
    sql: query,
    values: [is_inactive,id],
  };
}

const deleteCarousel = (id) => {
  const query = `DELETE FROM carousel WHERE carousel_id=?`;
  return {
    sql: query,
    values: [id],
  };
}


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
  uploadCarousel,
  getAllCarousels,
  getAllActiveCarousels,
  updateCarouselStatus,
  deleteCarousel
};

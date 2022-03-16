const add = (services_id, services_name, services_price, users_id) => {
  const now = Date.now();
  const query = `INSERT INTO services(services_id, services_name, services_price, users_id, created_at, updated_at)
    VALUES
    (?, ?, ?, ?, ?, ?)`;

  return {
    sql: query,
    values: [services_id, services_name, services_price, users_id, now, now],
  };
};

const fetch = () => {
  return `SELECT services_id, services_name, services_price, users.first_name, users.last_name, services.created_at
    FROM services
    LEFT JOIN users
    ON services.users_id = users.users_id
    ORDER BY services.created_at DESC`;
};

module.exports = {
  add,
  fetch,
};

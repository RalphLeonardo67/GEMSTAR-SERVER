const uuidv4 = require("uuid");

const { executeScript } = require("../model/mysql/utils");
const servicesQuery = require("../model/mysql/query/services");

const add = ({ service_type, price, userId }) => {
  const serviceId = uuidv4.v4();
  return executeScript(
    servicesQuery.add(serviceId, service_type, price, userId)
  ).then(() => {
    return fetch();
  });
};

const fetch = () => {
  return executeScript(servicesQuery.fetch()).then((res) => res);
};

module.exports = {
  add,
  fetch,
};

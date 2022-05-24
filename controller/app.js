const { executeScript } = require("../model/mysql/utils");
const appQuery = require("../model/mysql/query/app");
const uuidv4 = require("uuid");
const req = require("express/lib/request");

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

const getAllCarousels = () => {
    return executeScript(appQuery.getAllCarousels());
}

const getAllActiveCarousels = () => {
    return executeScript(appQuery.getAllActiveCarousels());
}

const updateCarouselStatus = (id, is_inactive) => {
    return executeScript(appQuery.updateCarouselStatus(id, is_inactive));
}

const deleteCarousel = (id) => {
    return executeScript(appQuery.deleteCarousel(id));
}

const uploadCarousel = (carousel) => {
    const carouselData = {
        carousel_id: uuidv4.v4(),
        users_id: carousel.user_id,
        caption: carousel.caption,
        is_inactive: 1,
        filename: carousel.filename,
        file_destination: carousel.filepath
    };
    return executeScript(
        appQuery.uploadCarousel(carouselData)
    ).then(() => {
        return carouselData
    });
}

module.exports = {
    createLogs,
    fetchLogs,
    uploadCarousel,
    getAllCarousels,
    getAllActiveCarousels,
    updateCarouselStatus,
    deleteCarousel
};
const Joi = require("joi");


const validateCarousel = (carousel) => {
    const schema = Joi.object({
        caption: Joi.string().min(5).max(190).required(),
        filename: Joi.string().required(),
    });

    return schema.validate(carousel);
}

exports.validate = validateCarousel;
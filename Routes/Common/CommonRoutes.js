const { Router } = require('express');
const { GetStaticData } = require('../../Controllers/Common/Common.controller');

const CommonRoutes = Router();

CommonRoutes.get('/static_data',GetStaticData);


module.exports = {
    CommonRoutes
};
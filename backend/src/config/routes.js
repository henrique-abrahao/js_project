const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // TODO Routes
    const rankService = require('../api/todo/rankService')
    rankService.register(router, '/rank')
}
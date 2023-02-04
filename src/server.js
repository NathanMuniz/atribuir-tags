"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get('/test', function (request, response) {
    return response.send("Olá mundo");
});
app.post("test-post", function (request, response) {
    return response.send("Olá mundo, método post");
});
app.listen(3000, function () { return console.log("Server is running"); });

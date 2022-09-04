"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cats_model_1 = require("./cats.model");
var express_1 = require("express");
var router = express_1.Router();
router.get("/cats", function (req, res) {
    try {
        var cats = cats_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: "error",
        });
    }
});
router.get("/cat/:id", function (req, res) {
    try {
        var params_1 = req.params;
        console.log(params_1);
        var cat = cats_model_1.Cat.find(function (cat) {
            return cat.id === params_1.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat: cat,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: "error",
        });
    }
});
router.post("/cats", function (req, res) {
    try {
        var data = req.body;
        cats_model_1.Cat.push(data);
        console.log(data);
        res.status(200).send({
            success: true,
            data: { data: data },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: "error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=cats.route.js.map
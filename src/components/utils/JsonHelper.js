"use strict";
//import Logger from "./Logger";
exports.__esModule = true;
var JsonHelper = /** @class */ (function () {
    function JsonHelper() {
    }
    /**
     * Converts buffer stream to string.
     *
     * @param {*} bufferOne
     * @returns {string}
     * @memberof JsonHelper
     */
    JsonHelper.prototype.init = function (bufferOne) {
        this.jsonStr = bufferOne.toString("utf8");
        this.createObject(this.jsonStr);
    };
    ;
    /**
     * Converts string to object.
     *
     * @param {string} jsonStr
     * @returns {boolean}
     * @memberof JsonHelper
     */
    JsonHelper.prototype.createObject = function (jsonStr) {
        try {
            this.opt = JSON.parse(jsonStr);
            this.obj = JSON.parse(jsonStr);
        }
        catch (e) {
            //Logger.log("Received non-JSON");
            return false;
        }
        return true;
    };
    /**
     * getObject
     */
    JsonHelper.prototype.getOptions = function () {
        return this.opt;
    };
    return JsonHelper;
}());
exports.JsonHelper = JsonHelper;

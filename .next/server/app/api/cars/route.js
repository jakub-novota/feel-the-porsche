"use strict";
(() => {
var exports = {};
exports.id = 1377;
exports.ids = [1377];
exports.modules = {

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 57407:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/cars/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(35387);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(29267);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(32413);
// EXTERNAL MODULE: ./src/app/libs/mongodb.ts
var mongodb = __webpack_require__(84088);
// EXTERNAL MODULE: ./src/app/models/carsSchema.tsx
var carsSchema = __webpack_require__(63877);
;// CONCATENATED MODULE: ./src/app/api/cars/route.ts



async function POST(params) {
    const { id, name, description, power_PS, power_HP, max_speed, transmission, acceleration, year, capacity, drive, cylinder_capacity, model, body, mileage, fuel, image, image_cars, gallery } = await params.json();
    await (0,mongodb/* default */.Z)();
    await carsSchema/* default */.Z.create({
        id,
        name,
        description,
        power_PS,
        power_HP,
        max_speed,
        transmission,
        acceleration,
        year,
        capacity,
        drive,
        cylinder_capacity,
        model,
        body,
        mileage,
        fuel,
        image,
        image_cars,
        gallery
    });
    //await CarModel.updateMany({}, { $set: { power_PS } }); // Add power_PS field to all documents
    return next_response/* default */.Z.json({
        message: "Car Created"
    }, {
        status: 201
    });
}
async function GET(params) {
    await (0,mongodb/* default */.Z)();
    const cars = await carsSchema/* default */.Z.find();
    return next_response/* default */.Z.json({
        cars
    });
}
async function DELETE(params) {
    const id = params.nextUrl.searchParams.get("id");
    await (0,mongodb/* default */.Z)();
    await carsSchema/* default */.Z.findByIdAndDelete(id);
    return next_response/* default */.Z.json({
        message: "Car Deleted"
    }, {
        status: 200
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcars%2Froute&name=app%2Fapi%2Fcars%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcars%2Froute.ts&appDir=%2FUsers%2Ftibilapos%2FDocuments%2FAconsulting%2Ffeel-the-porsche%2Fsrc%2Fapp&appPaths=%2Fapi%2Fcars%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/cars/route","pathname":"/api/cars","filename":"route","bundlePath":"app/api/cars/route"},"resolvedPagePath":"/Users/tibilapos/Documents/Aconsulting/feel-the-porsche/src/app/api/cars/route.ts","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/cars/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3763,5981,2917,3416], () => (__webpack_exec__(57407)));
module.exports = __webpack_exports__;

})();
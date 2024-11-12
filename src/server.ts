import Hapi, { Server } from "@hapi/hapi";

let vendor: Server;

export const init = async (): Promise<Server> => {
  vendor = Hapi.server({
    port: process.env.PORT || 8080,
    host: "localhost",
  });

  vendor.ext("onRequest", (request, h) => {
    console.log("vendor requested");
    return h.continue;
  });

  vendor.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "vendor-ware";
    },
  });

  return vendor;
};

export const start = async (): Promise<void> => {
  await vendor.start();
  console.log(
    `vendor server running on ${vendor.settings.host}:${vendor.settings.port}`
  );
};

process.on("unhandledRejection", (err) => {
  console.log("vendor server 'unhandledRejection' error");
  console.log(err);
  console.log("vendor exit");
  process.exit(1);
});

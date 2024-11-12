import Hapi, { Server } from "@hapi/hapi";

let server: Server;

export const init = async (): Promise<Server> => {
  server = Hapi.server({
    port: process.env.PORT || 8080,
    host: "localhost",
  });

  server.ext("onRequest", (request, h) => {
    console.log(`vendor perform ${request.method} on ${request.url}`);
    return h.continue;
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "vendor-ware";
    },
  });

  return server;
};

export const start = async (): Promise<void> => {
  await server.start();
  console.log(
    `vendor running on ${server.settings.host}:${server.settings.port}`
  );
};

process.on("unhandledRejection", (err) => {
  console.log("vendor 'unhandledRejection' error");
  console.log(err);
  console.log("vendor exit");
  process.exit(1);
});

init().then(() => start());

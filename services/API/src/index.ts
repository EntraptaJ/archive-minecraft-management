// API/src/index.ts
// Kristian Jones <me@kristianjones.xyz>
// Main startup of Docs Markdown API
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import jwt from 'koa-jwt';
import KoaRouter from 'koa-router';
import mongoose from 'mongoose';
import tempy from 'tempy'
import { zip } from 'zip-a-folder'
import send from 'koa-send'
import { remove } from 'fs-extra'
import { createRouteExplorer } from 'altair-koa-middleware';
import { buildAPISchema } from './API';
import { Context } from './API/Context';
import { UserModel } from './Models/User';

const port = 80;

const startWeb = async () => {
  const schema = await buildAPISchema();
  const app = new Koa();
  const router = new KoaRouter();

  process.setMaxListeners(10000);

  app.use(jwt({ secret: 'SECRET', passthrough: true }));

  const apiServer = new ApolloServer({
    schema,
    introspection: true,
    context: async ({ ctx: { state } }): Promise<Context> => ({
      user: state.user ? await UserModel.findOne({ id: state.user.id }) : undefined,
    }),
  });

  router.get('/mods.zip', async (ctx, next) => {
    const tmpFile = tempy.file({ extension: '.zip' });
    console.log(tmpFile)
    await zip('/minecraft/mods', tmpFile)
    await send(ctx, tmpFile)
    await remove(tmpFile)
  })

  createRouteExplorer({
    url: '/altair',
    router,
    opts: {
      endpointURL: '/graphql',
    },
  });

  app.use(router.routes()).use(router.allowedMethods());

  apiServer.applyMiddleware({ app });
  return app;
};

const startAPI = async () => {
  console.log('Starting API');
  await mongoose.connect('mongodb://mc-db:27017/DOCS');

  const [app] = await Promise.all([startWeb()]);
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
};

startAPI();

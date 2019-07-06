// API/src/index.ts
// Kristian Jones <me@kristianjones.xyz>
// Main startup of Docs Markdown API
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import jwt from 'koa-jwt';
import KoaRouter from 'koa-router';
import mongoose from 'mongoose';
import tempy from 'tempy';
import { verify } from 'jsonwebtoken';
import { zip } from 'zip-a-folder';
import send from 'koa-send';
import { remove } from 'fs-extra';
import { createRouteExplorer } from 'altair-koa-middleware';
import { buildAPISchema } from './API';
import { ContextType } from './API/Context';
import { UserModel } from './Models/User';
import { discordClient } from './Discord';
import { TextChannel } from 'discord.js';
import { connectRCON } from './RCON';
import { findContainer } from './Utils/Docker';

const port = 80;

const MCPath = process.env.MCPath || '/minecraft';

// @ts-ignore
export const minecraftChannel = discordClient.channels.find('name', 'minecraft') as TextChannel;

const startWeb = async () => {
  const schema = await buildAPISchema();
  const app = new Koa();
  const router = new KoaRouter();

  process.setMaxListeners(10000);

  app.use(jwt({ secret: 'SECRET', passthrough: true }));

  const apiServer = new ApolloServer({
    schema,
    introspection: true,
    context: async ({ ctx, connection }): Promise<ContextType> => {
      if (connection) {
        if (!connection.context.authToken) return { user: undefined };
        try {
          const JWT = verify(connection.context.authToken, 'SECRET') as { id: string };
          if (!JWT.id) return { user: undefined };
          else return { user: await UserModel.findOne({ id: JWT.id }) };
        } catch {
          return { user: undefined };
        }
      }
      if (ctx && ctx.state) {
        return { user: ctx.state.user ? await UserModel.findOne({ id: ctx.state.user.id }) : undefined };
      }
    },
  });

  router.get('/mods.zip', async (ctx, next) => {
    const tmpFile = tempy.file({ extension: '.zip' });
    await zip(`${MCPath}/mods`, tmpFile);
    await send(ctx, tmpFile, { root: '/' });
    await remove(tmpFile);
  });

  router.get('/downloadMod/:modName', async (ctx, next) => {
    const modName = ctx.params.modName;
    if (!modName) next();
    else await send(ctx, modName, { root: `${MCPath}/mods` });
  });

  createRouteExplorer({
    url: '/altair',
    router,
    opts: {
      endpointURL: '/graphql',
    },
  });

  app.use(router.routes()).use(router.allowedMethods());

  const httpServer = app.listen(port);
  apiServer.applyMiddleware({ app });
  apiServer.installSubscriptionHandlers(httpServer);
  return app;
};

const startDiscord = async () => process.env.DISCORD && discordClient.login(process.env.DISCORD, `${__dirname}/Discord/*.ts`);

const startAPI = async () => {
  console.log('Starting API');
  const db = process.env.DBHost || 'localhost';
  await mongoose.connect(
    `mongodb://${db}:27017/MC`,
    { useNewUrlParser: true },
  );

  const cont = await findContainer();
  const contStatus = await cont.inspect();
  // @ts-ignore
  if (contStatus.State.Status === 'running' && contStatus.State.Health.Status === 'healthy') connectRCON();
  await Promise.all([startWeb(), startDiscord()]);
  console.log(`Server listening on port ${port}`);
};

startAPI();

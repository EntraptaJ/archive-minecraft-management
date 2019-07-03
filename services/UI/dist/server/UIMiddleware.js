"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = __importStar(require("chokidar"));
require("isomorphic-unfetch");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
/*
async function getUiServer() {
  const stf = 'dist/server/parcel-manifest.json';
  const uiManifest = await readJSON(stf);
  return import(`.${uiManifest['server.tsx']}`);
} */
async function getUiServer() {
    const stf = `${__dirname}/../server/parcel-manifest.json`;
    const uiManifest = await fs_extra_1.readJSON(stf);
    const serverFilename = path_1.resolve(`${__dirname}/../server/${uiManifest['server.tsx']}`);
    return Promise.resolve().then(() => __importStar(require(serverFilename)));
}
async function hotUiServer(req, res) {
    let { uiServer } = await getUiServer();
    if (process.env.NODE_ENV === 'development')
        chokidar
            .watch(`dist/server/parcel-manifest.json`, {
            ignoreInitial: true,
            awaitWriteFinish: { stabilityThreshold: 100 },
        })
            .on('all', async () => {
            process.stdout.write('Reloading UI Server...');
            uiServer = (await getUiServer()).uiServer;
            process.stdout.write('✅\n');
        });
    return uiServer(req, res);
}
exports.hotUiServer = hotUiServer;

"use strict";

import greenlock from 'greenlock-express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import pkg from './package.json' assert { type: "json" };


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// set a global subscriber account with the API

greenlock
    .init({
        // where to find .greenlockrc and set default paths
        packageRoot: __dirname,

        // where config and certificate stuff go
        configDir: "./greenlock.d",

        // contact for security and critical bug notices
        maintainerEmail: pkg.author,

        // name & version for ACME client user agent
        //packageAgent: pkg.name + "/" + pkg.version,

        // whether or not to run at cloudscale
        cluster: false
    })
    .serve((req, res) => {
      app(req, res);
    });

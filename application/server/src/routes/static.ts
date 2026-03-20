import history from "connect-history-api-fallback";
import type { RequestHandler } from "express";
import { Router } from "express";
import serveStatic from "serve-static";

import {
  CLIENT_DIST_PATH,
  PUBLIC_PATH,
  UPLOAD_PATH,
} from "@web-speed-hackathon-2026/server/src/paths";

export const staticRouter = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
staticRouter.use(history());

const longCacheOptions = {
  etag: true,
  lastModified: true,
  maxAge: "1y",
} as const;

staticRouter.use(
  serveStatic(UPLOAD_PATH, {
    etag: true,
    lastModified: true,
    maxAge: "1d",
  }),
);

staticRouter.use(
  serveStatic(PUBLIC_PATH, longCacheOptions),
);

staticRouter.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: true,
    lastModified: true,
    maxAge: "1y",
    setHeaders(res, path) {
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

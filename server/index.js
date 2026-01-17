import express from "express";
import cors from "cors";
import path from "path";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import timerWidgetRoutes from "./routes/timerwidget.js";

const PORT = process.env.PORT || 3000;
const STATIC_PATH = path.resolve("./frontend/dist");

const app = express();

app.use(cors());
app.use(express.json());

app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: {} })
);

app.use("/api/widget/timer", timerWidgetRoutes);

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), (_req, res) => {
  res.sendFile(path.join(STATIC_PATH, "index.html"));
});

app.listen(PORT);

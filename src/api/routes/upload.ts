import { upload } from "../middlewares/multerMiddleware";
import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert } from "firebase-admin/app";
import * as express from "express";
import { authorization } from "../middlewares/JwtAuthorizationMiddleware";
const uploadRouter = express.Router();
const googleCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = require(googleCredentials);

uploadRouter.use(authorization);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "spotyone-dcc10.appspot.com",
});

const bucket = getStorage().bucket();

uploadRouter.post("/cover", upload.single("cover"), async (req, res) => {

  const file = bucket.file(`albumCover/${Date.now()}-${req.file.originalname}`);
  await file.save(req.file.buffer, { contentType: req.file.mimetype , public: true });
  const url = file.publicUrl();

  res.status(200).send({
    url: url,
  });
});

export { uploadRouter };

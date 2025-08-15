import express from "express";
import cors from "cors";

// import userRouter from "./routes/user.routes";
// import authRouter from "./routes/auth.routes";
// import tweetRouter from "./routes/tweet.routes";
// import followerRouter from "./routes/follower.routes";
// import likeRouter from "./routes/like.routes";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //   app.use(authRouter);

  //   app.use(userRouter); //rotas
  //   app.use(tweetRouter);

  //   app.use(followerRouter);
  //   app.use(likeRouter);

  return app;
}

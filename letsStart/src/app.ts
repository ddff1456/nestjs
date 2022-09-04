import * as express from "express";
import catsRouter from "./cats/cats.route";
const app: express.Express = express();

const data = [1, 2, 3, 4];
//* logging middleware
app.use((req, res, next) => {
  //미들웨어 (next를 추가하게되면 미들웨어가 된다.)
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

//* json middleware
app.use(express.json()); //json 데이터 형식을 쓰게 해주는 미들웨어

app.use(catsRouter);

// * 404 middleware
app.use((req, res, next) => {
  // 내가만든 get,post가 없으면 해당 미들웨어에 타서 404 에러를 보여준다.(제일 밑에 놔둔다.)
  console.log(req.rawHeaders[1]);
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on...");
});

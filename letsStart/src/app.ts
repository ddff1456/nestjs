import * as express from "express";
const app: express.Express = express();
const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  //경로가 없으면 헬로월드를 출력하라
  console.log(req);
  res.send("Hello World!");
});

app.listen(port, () => {
  //서버를 연다
  console.log(`Example app listening at http://localhost:${port}`);
});

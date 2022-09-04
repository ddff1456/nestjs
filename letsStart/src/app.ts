import * as express from "express";
import { Cat, CatType } from "./app.model";
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

//* Read 고양이 전체 데이터 다 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    //throw new Error("db connect error"); //일부러 400 에러내기
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});
//* Read 특정 고양이 데이터 조회
app.get("/cat/:id", (req, res) => {
  // :을 붙이면 파라메타가 된다.
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});

//* CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data); //Create 한다는 가정
    console.log(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});

// * 404 middleware
app.use((req, res, next) => {
  // 내가만든 get,post가 없으면 해당 미들웨어에 타서 404 에러를 보여준다.(제일 밑에 놔둔다.)
  console.log(req.rawHeaders[1]);
  res.send({ error: "404 not found error" });
});

app.listen(8000, () => {
  console.log("server is on...");
});

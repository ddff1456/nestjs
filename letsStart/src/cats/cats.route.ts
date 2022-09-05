import { Cat, CatType } from "./cats.model";
import { Router } from "express";

const router = Router();

//* Read 고양이 전체 데이터 다 조회
router.get("/cats", (req, res) => {
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
router.get("/cat/:id", (req, res) => {
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
router.post("/cats", (req, res) => {
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

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const body = req.body;
    console.log(body);
    let result;
    Cat.forEach((cat) => {
      if (cat.id == params.id) {
        cat = body;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});
//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const body = req.body;
    console.log(body);
    let result;
    Cat.forEach((cat) => {
      if (cat.id == params.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});
//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "error",
    });
  }
});
//반드시 지킬 필요는 없다.
export default router;

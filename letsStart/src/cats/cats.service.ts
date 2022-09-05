import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";
//싱글톤 패턴을 사용하는 이유 최초 한번의 new연산자통해서 객체를 만들수 있어서 추후 객체에 접근할때 메모리낭비를 방지할 수 있음. 다른 클래스간의 데이터 공유자 쉽다.

//* Read 고양이 전체 데이터 다 조회
export const readAllcat = (req: Request, res: Response) => {
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
};
//* Read 특정 고양이 데이터 조회
export const readCat = (req: Request, res: Response) => {
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
};
//* CREATE 새로운 고양이 추가
export const createCat = (req: Request, res: Response) => {
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
};
//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
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
};
//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updateParialCat = (req: Request, res: Response) => {
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
};
//* DELETE 고양이 데이터 삭제 -> DELETE
//router.delete("/cats/:id", (req, res)
export const deleteCat = (req: Request, res: Response) => {
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
};
//반드시 지킬 필요는 없다.

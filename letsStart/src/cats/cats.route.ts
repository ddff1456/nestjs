import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updateParialCat,
} from "./cats.service";

const router = Router();
//싱글톤 패턴을 사용하는 이유 최초 한번의 new연산자통해서 객체를 만들수 있어서 추후 객체에 접근할때 메모리낭비를 방지할 수 있음. 다른 클래스간의 데이터 공유자 쉽다.

//* Read 고양이 전체 데이터 다 조회
router.get("/cats", readAllcat);
//* Read 특정 고양이 데이터 조회
// router.get("/cat/:id", (req, res) => {
//   // :을 붙이면 파라메타가 된다.
//   try {
//     const params = req.params;
//     console.log(params);
//     const cat = Cat.find((cat) => {
//       return cat.id === params.id;
//     });
//     res.status(200).send({
//       success: true,
//       data: {
//         cat,
//       },
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       error: "error",
//     });
//   }
// });

router.get("/cats/:id", readCat);

//* CREATE 새로운 고양이 추가
router.post("/cats", createCat);

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put("/cats/:id", updateCat);

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch("/cats/:id", updateParialCat);

//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete("/cats/:id", deleteCat);
//반드시 지킬 필요는 없다.
export default router;

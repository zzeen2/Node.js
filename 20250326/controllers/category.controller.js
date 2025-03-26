const {Category} = require("../models/config")
const { findAll } = require("../models/user")

const categoryController = {
    async create (name, uid) {
        try {
            await Category.create({name, UserUid : uid})
            return ({state : 200, message : "유저 등록 완료"})
        } catch (error) {
            return {state: 400, message : error}
        }
    },
    async selectAllPageNation(index) {
        try {
            //console.log("index", index)
            // 페이지네이션을 구현했다고 가정하면 보여주는 갯수만큼 데이터에서 가져와야한다.
            // 페이지네이션 인덱스는 쿼리스트링으로 전달
            // limit : 몇개 보여줄지
            const data = await Category.findAll({
                limit : 5, // 5개를 가져온다.
                offset : 5 * (index -1), // 이미 앞에 넣은 5개 제외 // 0, 5, 10, 15
                // order : [["createAt", "DESC"]] // 최신순으로 정렬 (동적으로 바꿀 수 있음)
            });
            const counter = await Category.count(); // 데이터의 전체 개수
            
            return {state : 200, data, count : counter}
        } catch (error) {
            return {state : 400, message : "카테고리 조회 실패"}
        }
    },
    async selectAll() {
        try {
            const data = await Category.findAll();
            return {state:200, data}
        } catch (error) {
            return {state : 400, message : error}
        }
    }
}

module.exports = categoryController;
const { Posts } = require("../models/config");

const post = {
    async create(content, UserName) {
        try {
            await Posts.create({content, UserName});
            console.log(UserName);
            return {state : 200, message : "게시글 작성 성공"}
        } catch (error) {
            console.log(error);
            return {state : 400, message : error}
        }
    },

    async postSelectAll() {
        try {
            const data = await Posts.findAll();
            return {state : 200, message : "전체 조회 성공", data};
        } catch (error) {
            return {state : 400, message : error}
        }
    }
}

module.exports = post;
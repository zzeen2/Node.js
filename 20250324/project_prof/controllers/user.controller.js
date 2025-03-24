const { Users } = require('../models/config')

const user = {
    async create (name, nick, createAt) {
        try {
            await Users.create({name, nick, createAt});
            return {state : 200, message : "유저 등록 완료"}
        } catch (error) {
            return {state : 400, message : error};
        }
    },

    async userSelectAll () {
        try {
            const data = await Users.findAll();
            return {state : 200, message : "조회 성공", data}
        } catch (error) {
            return {state : 400, message : error}
        }
    }
}

module.exports = user;
const {Post, Category} = require("../models/config");

const postController = {
    async create (CategoryName, title, content, user,  UserUid){
        try {
            await Post.create({CategoryName, title, content,user,UserUid })
            return {state : 200, message : "글 추가 완료"}
        } catch (error) {
           return {state : 400, message : error} 
        }
    },
    async categoryPostSelectAll (name){
        try {
            console.log("name", name)
            const data =await Category.findAll({where : {name : name}, include : [Post]}); // join문
            // console.log(data.dataValues);
            // console.log(data.Posts);
            return {state : 200, data : data[0].dataValues.Posts}
        } catch (error) {
            return {state : 400, message : error};   
        }
    }
}



module.exports = postController;
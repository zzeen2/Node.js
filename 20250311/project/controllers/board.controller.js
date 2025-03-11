const {createBoardData, getBoardData} = require('../models/board');

exports.create = async (title, content) => {
   return await createBoardData(title, content);
}

exports.getBoard = async () => {
   return await getBoardData();
}
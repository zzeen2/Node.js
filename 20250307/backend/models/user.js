const user = [];

const userSelectAll = () => {
    return user;
}

// userFindUid 원시값을 매개변수로 받지 않는 함수
// 객체의 key 구조분해할당을 매개변수로 받아서
const userFindUid = ({uid}) => {
    const [data] = user.filter((el) => el.uid === uid)
    return data
}

const userFindUidUpw = ({uid,upw}) => {
    const [data] = user.filter((el) => (el.uid === uid) && (el.upw === upw))
    return data
}

const userSelectIndex = (index) => {
    return user[index]
}

const userCreate = (_user) => {
    user.push(_user);
}

module.exports = {userSelectAll, userFindUid, userSelectIndex, userCreate, userFindUidUpw}
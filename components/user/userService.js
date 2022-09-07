const { User } = require("../../models/index");


const allUser = async () => {
const all = await User.findAll({
    attributes: ["name", "location"],
    order: [["created_at", "DESC"]],
}).catch((err) => {
    throw new Error(err);
});
};

const newUser = async (name, location) => {
const create = await User.create({
    name: name,
    location: location,
}).catch((err) => {
    throw new Error(err);
});
return create;
};

module.exports = {
newUser,
allUser,
};
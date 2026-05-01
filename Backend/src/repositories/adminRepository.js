const prisma = require("../db/prisma");

// CREATE
const create = async (data) => {
    return prisma.admin.create({ data });
};

// GET ALL
const findAll = async () => {
    return prisma.admin.findMany();
};

// GET BY ID
const findById = async (id) => {
    return prisma.admin.findUnique({
        where: { id_admin: id }
    });
};

// GET BY EMAIL (LOGIN)
const findByEmail = async (email) => {
    return prisma.admin.findUnique({
        where: { email }
    });
};

// UPDATE
const update = async (id, data) => {
    return prisma.admin.update({
        where: { id_admin: id },
        data
    });
};

// DELETE
const remove = async (id) => {
    return prisma.admin.delete({
        where: { id_admin: id }
    });
};

module.exports = {
    create,
    findAll,
    findById,
    findByEmail,
    update,
    remove
};
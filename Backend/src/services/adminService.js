const adminRepo = require("../repositories/adminRepository");

// REGISTER
const register = async (data) => {
    return adminRepo.create(data);
};

// LOGIN
const login = async ({ email, password }) => {
    const admin = await adminRepo.findByEmail(email);

    if (!admin) throw new Error("Email tidak ditemukan");
    if (admin.password !== password) throw new Error("Password salah");

    return admin;
};

// GET ALL
const getAllAdmins = async () => {
    return adminRepo.findAll();
};

// GET BY ID
const getAdminById = async (id) => {
    return adminRepo.findById(id);
};

// UPDATE
const updateAdmin = async (id, data) => {
    return adminRepo.update(id, data);
};

// DELETE
const deleteAdmin = async (id) => {
    return adminRepo.remove(id);
};

module.exports = {
    register,
    login,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
};
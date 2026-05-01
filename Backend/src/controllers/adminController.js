const adminService = require("../services/adminService");
const supabase = require("../config/supabase");

// REGISTER
const register = async (req, res) => {
    try {
        const admin = await adminService.register(req.body);

        res.send({
            message: "register success",
            data: admin
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const admin = await adminService.login(req.body);

        res.send({
            message: "login success",
            data: admin
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

// GET ALL
const getAll = async (req, res) => {
    try {
        const data = await adminService.getAllAdmins();
        res.send(data);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// GET BY ID
const getById = async (req, res) => {
    try {
        const data = await adminService.getAdminById(Number(req.params.id));
        res.send(data);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const data = await adminService.updateAdmin(
            Number(req.params.id),
            req.body
        );

        res.send({
            message: "update success",
            data
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        await adminService.deleteAdmin(Number(req.params.id));

        res.send({
            message: "deleted"
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

// UPDATE PHOTO
const updatePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        // ambil admin lama
        const oldAdmin = await adminService.getAdminById(Number(req.params.id));

        // hapus foto lama
        if (oldAdmin.photo) {
            const oldPath = oldAdmin.photo.split("/profiles/")[1];

            if (oldPath) {
                await supabase.storage
                    .from("profiles")
                    .remove([oldPath]);
            }
        }

        const file = req.file;

        const cleanName = file.originalname.replace(/\s+/g, "_");
        const fileName = "admins/" + Date.now() + "-" + cleanName;

        const { error } = await supabase.storage
            .from("profiles")
            .upload(fileName, file.buffer, {
                contentType: file.mimetype
            });

        if (error) throw error;

        const { data } = supabase.storage
            .from("profiles")
            .getPublicUrl(fileName);

        const photoUrl = data.publicUrl;

        const admin = await adminService.updateAdmin(
            Number(req.params.id),
            { photo: photoUrl }
        );

        res.send({
            message: "photo updated",
            data: admin
        });

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
};

module.exports = {
    register,
    login,
    getAll,
    getById,
    update,
    remove,
    updatePhoto
};
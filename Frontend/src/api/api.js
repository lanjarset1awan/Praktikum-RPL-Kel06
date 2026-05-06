const BASE_URL = "http://localhost:2000";

// --- Reports API ---
export const fetchAllReports = async () => {
  const res = await fetch(`${BASE_URL}/reports`);
  if (!res.ok) throw new Error("Gagal mengambil laporan");
  return res.json();
};

export const createReport = async (formData) => {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error("Gagal kirim laporan");
  return res.json();
};

export const updateReport = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    method: "PUT",
    body: formData
  });
  if (!res.ok) throw new Error("Gagal update laporan");
  return res.json();
};

export const deleteReport = async (id) => {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Gagal hapus laporan");
  return res.text();
};

// --- Users API ---
export const updateUserProfile = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal update profil");
  return res.json();
};

export const updateUserPhoto = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/users/${id}/photo`, {
    method: "PUT",
    body: formData
  });
  if (!res.ok) throw new Error("Gagal update foto profil");
  return res.json();
};

// --- Admin API ---
export const updateAdminProfile = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal update profil admin");
  return res.json();
};

export const updateAdminPhoto = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/admin/${id}/photo`, {
    method: "PUT",
    body: formData
  });
  if (!res.ok) throw new Error("Gagal update foto profil admin");
  return res.json();
};

export default BASE_URL;
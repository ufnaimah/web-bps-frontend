// src/services/publicationService.js
import apiClient from '../api/axios';

export const publicationService = {
  async getPublications() {
    const res = await apiClient.get('/publikasi');
    return res.data;
  },

  async addPublication(newPublication) {
    const res = await apiClient.post('/publikasi', newPublication);
    return res.data;
  },

  async editPublication(updatedPublication) {
    const res = await apiClient.put(`/publikasi/${updatedPublication.id}`, updatedPublication);
    return res.data;
  },

  async deletePublication(id) {
    const res = await apiClient.delete(`/publikasi/${id}`);
    return res.data;
  }
};

// ✅ Tambahkan fungsi upload image ke Cloudinary
export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    throw new Error('Konfigurasi Cloudinary belum lengkap di .env');
  }

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Upload gagal');
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    throw new Error('Gagal upload ke Cloudinary: ' + error.message);
  }
}

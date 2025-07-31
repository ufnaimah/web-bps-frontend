import React, { useState, useEffect } from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';

export default function PublicationListPage() {
  const { publications, deletePublication, fetchPublications } = usePublications();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // ✅ Ambil data dari API saat halaman dimuat
  useEffect(() => {
    fetchPublications();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus publikasi ini?");
    if (confirm) {
      try {
        await deletePublication(id);
        alert("Publikasi berhasil dihapus");
        fetchPublications(); // refresh data setelah hapus
      } catch (error) {
        alert("Gagal menghapus publikasi: " + error.message);
      }
    }
  };

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Daftar Publikasi BPS Provinsi Jawa Timur</h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>

      {/* Kolom pencarian */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-gray-400 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white/70 text-gray-800"
        />
      </div>

      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-center w-16">No</th>
              <th scope="col" className="px-6 py-3 text-center w 40">Judul</th>
              <th scope="col" className="px-6 py-3 text-center w-120">Deskripsi</th>
              <th scope="col" className="px-6 py-3 text-center w-30">Tanggal Rilis</th>
              <th scope="col" className="px-6 py-3 text-center w-30">Sampul</th>
              <th scope="col" className="px-6 py-3 text-center w-45">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub, idx) => (
                <tr key={pub.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900 text-center">{idx + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{pub.title}</td>
                  <td className="px-6 py-4">{pub.description}</td>
                  <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                  <td className="px-6 py-4 flex justify-center items-center">
                    <img
                      src={pub.coverUrl}
                      alt={`Sampul ${pub.title}`}
                      className="h-24 w-auto object-cover rounded shadow-md"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold"
                      onClick={() => navigate(`/publications/edit/${pub.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                      onClick={() => handleDelete(pub.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Publikasi yang dicari tidak tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

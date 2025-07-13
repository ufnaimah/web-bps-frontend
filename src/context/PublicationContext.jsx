// src/context/PublicationContext.jsx
import { createContext, useState, useEffect } from "react";
import { publicationService } from "../services/publicationService";

const PublicationContext = createContext(null);

const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API saat pertama kali load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await publicationService.getPublications();
        setPublications(data);
      } catch (error) {
        console.error("Gagal mengambil data publikasi:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addPublication = async (newPub) => {
    try {
      const savedPub = await publicationService.addPublication(newPub);
      setPublications((prev) => [savedPub, ...prev]);
      return savedPub;
    } catch (error) {
      console.error("Gagal menambah publikasi:", error);
      throw error;
    }
  };

  const editPublication = async (updatedPub) => {
    try {
      const savedPub = await publicationService.editPublication(updatedPub);
      setPublications((prev) =>
        prev.map((pub) => (pub.id === savedPub.id ? savedPub : pub))
      );
      return savedPub;
    } catch (error) {
      console.error("Gagal update publikasi:", error);
      throw error;
    }
  };

  const deletePublication = async (id) => {
    try {
      await publicationService.deletePublication(id);
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
    } catch (error) {
      console.error("Gagal menghapus publikasi:", error);
      throw error;
    }
  };

  const fetchPublications = async () => {
    try {
      const data = await publicationService.getPublications();
      setPublications(data);
      return data;
    } catch (error) {
      console.error("Gagal mengambil publikasi:", error);
      throw error;
    }
  };

  return (
    <PublicationContext.Provider
      value={{
        publications,
        addPublication,
        editPublication,
        deletePublication,
        fetchPublications,
        loading,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};

export { PublicationContext, PublicationProvider };

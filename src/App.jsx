// src/App.jsx

import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/EditPublicationPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import GalleryPage from './components/GalleryPage';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          <Route 
            path="/" element={
            <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
          } />


          {/* Protected Routes */}
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/add"
            element={
              <ProtectedRoute>
                <AddPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications/edit/:id"
            element={
              <ProtectedRoute>
                <EditPublicationPage />
              </ProtectedRoute>
            }
          />

          <Route path="/galeri" element={<GalleryPage />} />


          {/* Redirect Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

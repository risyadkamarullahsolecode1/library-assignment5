import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/templates/Header';
import HomePage from './components/pages/HomePage';
import BooksPage from './components/pages/BooksPage';
import BookDetailPage from './components/pages/BookDetailPage';
import AddBookPage from './components/pages/AddBookPage';
import EditBookPage from './components/pages/EditBookPage';
import AddMemberPage from './components/pages/AddMemberPage';
import EditMemberPage from './components/pages/EditMemberPage';
import MemberDetailPage from './components/pages/MemberDetailPage';
import MemberPage from './components/pages/MemberPage';
import BorrowPage from './components/pages/BorrowPage';
import BorrowForm from './components/molecules/BorrowForm';
import ReturnForm from './components/molecules/ReturnForm';
import ReturnPage from './components/pages/ReturnPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // Import React Query
import BookSearch from './components/pages/BookSearch';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>  {/* Wrap the entire app in QueryClientProvider */}
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/add" element={<AddBookPage />} />
        <Route path="/books/search" element={<BookSearch />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/books/edit/:id" element={<EditBookPage />} />
        <Route path="/members" element={<MemberPage />} />
        <Route path="/members/add" element={<AddMemberPage />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
        <Route path="/members/edit/:id" element={<EditMemberPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
        <Route path="/borrow/form" element={<BorrowForm />} />
        <Route path="/return" element={<ReturnPage />} />
        <Route path="/return/form" element={<ReturnForm />} />
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}


export default App

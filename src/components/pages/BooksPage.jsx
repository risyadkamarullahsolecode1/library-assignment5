import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import apiClient from "../../axiosConfig";
import BookList from "../organisms/BookList";

// Fetch books from the backend
const fetchBooks = async ({ page, pageSize, searchQuery, filters }) => {
  const { data } = await apiClient.get("/Book/search", {
    params: {
      PageNumber: page, // Pagination parameters
      PageSize: pageSize,
      ...searchQuery, // Search query parameters
      ...filters, // Filters like Language, Category, etc.
    },
  });
  return data;
};

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // For title search
  const [filters, setFilters] = useState({}); // For additional filters (e.g., Language)
  const [page, setPage] = useState(1); // Current page
  const pageSize = 10; // Number of items per page

  // Fetch books with React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books", page, searchQuery, filters],
    queryFn: () =>
      fetchBooks({
        page,
        pageSize,
        searchQuery: { Title: searchQuery }, // Send the search query as a parameter
        filters,
      }),
    keepPreviousData: true, // Keeps the previous data while fetching new data
  });

  // Handle search query input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page when search query changes
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, Language: e.target.value });
    setPage(1); // Reset to the first page when filters change
  };

  // Handle pagination page change
  const handlePageChange = ({ selected }) => {
    setPage(selected + 1); // React Paginate uses a 0-based index
  };

  // Loading and error states
  if (isLoading) return <Container>Loading...</Container>;
  if (isError) return <Container>Error: {error.message}</Container>;
  
  return (
    <Container>
      <h1>Books</h1>
      <Link to="/books/add">
        <Button variant="primary" className="mb-3">
          Add New Book
        </Button>
      </Link>

      {/* Search Field */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search books by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>

      {/* Filter Dropdown */}
      <Form.Group className="mb-3">
        <Form.Control as="select" value={filters.Language || ""} onChange={handleFilterChange}>
          <option value="">Filter by Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </Form.Control>
      </Form.Group>

      {/* Book List */}
      <BookList books={data?.data || []} />

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(data?.totalCount / pageSize)} // Calculate total pages
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLabel={"..."}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    </Container>
  );
};

export default BooksPage;

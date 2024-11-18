import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Table, Dropdown, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import apiClient from "../api/apiClient"; // Axios instance
import { toast } from "react-toastify";

const fetchBooks = async ({ page, pageSize, searchQuery, filters, sortField, sortOrder }) => {
  const { data } = await apiClient.get("/Book/search", {
    params: {
      page,
      pageSize,
      ...searchQuery,
      ...filters,
      sortBy: sortField,
      sortOrder,
    },
  });
  return data;
};

const BookSearch = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // General search
  const [filters, setFilters] = useState({}); // Advanced filters
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch books using react-query
  const { data, isLoading, isError } = useQuery(
    ["books", page, pageSize, searchQuery, filters, sortField, sortOrder],
    () =>
      fetchBooks({
        page,
        pageSize,
        searchQuery: { Title: searchQuery },
        filters,
        sortField,
        sortOrder,
      }),
    { keepPreviousData: true }
  );

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  // Render
  return (
    <Container>
      <h1 className="my-4">Book Search</h1>

      {/* Search and Filters */}
      <Row className="mb-3">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search books by title..."
              type="text"
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Dropdown onSelect={(eventKey) => handleFilterChange("Language", eventKey)}>
            <Dropdown.Toggle variant="outline-primary" id="language-dropdown">
              {filters.Language || "Filter by Language"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="English">English</Dropdown.Item>
              <Dropdown.Item eventKey="Spanish">Spanish</Dropdown.Item>
              <Dropdown.Item eventKey="French">French</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>
              <button
                onClick={() => handleSort("Category")}
                className="btn btn-link p-0 text-decoration-none"
              >
                Category {getSortIcon("Category")}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort("ISBN")}
                className="btn btn-link p-0 text-decoration-none"
              >
                ISBN {getSortIcon("ISBN")}
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSort("Title")}
                className="btn btn-link p-0 text-decoration-none"
              >
                Title {getSortIcon("Title")}
              </button>
            </th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center">
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={5} className="text-center text-danger">
                Failed to load data.
              </td>
            </tr>
          ) : (
            data?.map((book) => (
              <tr key={book.ISBN}>
                <td>{book.Category}</td>
                <td>{book.ISBN}</td>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={() => toast.info(`Viewing details for ${book.Title}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookSearch;

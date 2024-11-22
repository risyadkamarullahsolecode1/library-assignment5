import React, { useState } from "react";
import { Container, InputGroup, Form, Card, Button, Row, Col } from "react-bootstrap";
import BookService from "../../service/BookService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import "../styling/paginate.css";
import { Link } from "react-router-dom";

// Function to fetch books based on pagination
const fetchBooks = async ({ page, pageSize, searchQuery, sortField, sortOrder }) => {
  const { data } = await BookService.search({
    PageNumber: page,
    PageSize: pageSize,
    Keyword: searchQuery,
    SortBy: sortField,
    SortOrder: sortOrder,
  });
  return data;
};

const BookSearch = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Use react-query to fetch the data with page and pageSize
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page, pageSize, searchQuery, sortField, sortOrder],
    queryFn: () => fetchBooks({ page, pageSize, searchQuery, sortField, sortOrder }),
    keepPreviousData: true,
    placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching books.</p>;

  // Ensure data exists and has the structure we expect
  const pageCount = Math.ceil(data.total / pageSize);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to page 1 when page size changes
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1); // React-Paginate uses 0-based index
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <Container>
      <h1 className="mb-4">Book Search</h1>
      {/* Search Input */}
      <InputGroup className="mb-3">
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          placeholder="Enter keyword..."
          type="text"
          onChange={handleSearch}
          value={searchQuery}
        />
      </InputGroup>

      {/* Sorting Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button
            variant="link"
            onClick={() => handleSort("id")}
            className="text-decoration-none text-dark"
          >
            ID {getSortIcon("id")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("author")}
            className="text-decoration-none text-dark"
          >
            Author {getSortIcon("author")}
          </Button>
          <Button
            variant="link"
            onClick={() => handleSort("title")}
            className="text-decoration-none text-dark"
          >
            Title {getSortIcon("title")}
          </Button>
        </div>
        <Form.Select onChange={handlePageSizeChange} value={pageSize} style={{ width: "150px" }}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Book Cards */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {data?.data?.map((book) => (
          <Col key={book.id}>
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  by {book.author}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Category:</strong> {book.category}
                  <br />
                  <strong>ISBN:</strong> {book.isbn}
                </Card.Text>
                <Link to={`/books/${book.id}`}>
                    <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
      />
    </Container>
  );
};

export default BookSearch;

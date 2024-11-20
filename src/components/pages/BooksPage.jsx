import React,{useState, useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import BookList from '../organisms/BookList';
import apiClient from '../../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import BookService from "../../service/BookService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import "../styling/paginate.css";

const fetchBooks = async ({ page, pageSize, sortField, sortOrder }) => {
  const { data } = await BookService.search({
    PageNumber: page,
    PageSize: pageSize,
    SortBy: sortField,
    SortOrder: sortOrder,
  });
  return data;
};

const BookPages = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [books, setBooks] = useState([]);
  const pageSizes = [3, 6, 9];

  // Fetch books with pagination and sorting
  const handleFetchBooks = async () => {
    try {
      const data = await fetchBooks({
        page,
        pageSize,
        sortField,
        sortOrder,
      });
      setBooks(data.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setPage(1); // Reset to the first page when page size changes
    handleFetchBooks();
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1); // React-Paginate uses 0-based index
    handleFetchBooks();
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    handleFetchBooks();
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  // Fetch books initially when the component mounts
  React.useEffect(() => {
    handleFetchBooks();
  }, [page, pageSize, sortField, sortOrder]);

  return (
    <Container>
      <h1>Books</h1>
      <Link to="/books/search">
        <Button variant="primary" className="mb-3">
            <FontAwesomeIcon icon={faMagnifyingGlass}/> Search
        </Button>
      </Link>
      <Link to="/books/add">
        <Button variant="primary" className="mb-3">Add New Book</Button>
      </Link>
      <BookList books={books} handleSort={handleSort} getSortIcon={getSortIcon} />

      <div className="d-flex align-items-center justify-content-between mt-4">
        <div>
          Items per Page:{" "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(books.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </Container>
  );
};

export default BookPages;
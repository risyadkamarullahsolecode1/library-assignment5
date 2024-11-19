import React, { useState } from "react";
import { Container, ListGroup, InputGroup, Form, Table, Button } from 'react-bootstrap';
import BookService from "../../service/BookService";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import '../styling/paginate.css'

// Function to fetch books based on pagination
const fetchBooks = async ({ page, pageSize, searchQuery, sortField, sortOrder }) => {
    const { data } = await BookService.search({
      PageNumber: page,
      PageSize: pageSize,
      Keyword: searchQuery,
      SortBy: sortField,
      SortOrder : sortOrder
    });
    return data;
}

const BookSearch = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const pageSizes = [3, 6, 9];
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    // Use react-query to fetch the data with page and pageSize
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', page, pageSize, searchQuery, sortField, sortOrder],
    queryFn: () => fetchBooks({ page, pageSize, searchQuery, sortField, sortOrder }),
    keepPreviousData: true,
    onSuccess: (data) => {
        console.log(data); // Log the data to inspect its structure
      },
    placeholderData: keepPreviousData
  });

  // Check if the data is loading or error occurred
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts</p>;

  // Ensure data exists and has the structure we expect
  const pageCount = Math.ceil(data.total / pageSize);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to page 1 when page size changes
  };

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1); // React-Paginate uses 0-based index
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    };

    const handleSort = (field) => {
        if (field === sortField) {  
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
        } else {
        setSortField(field);
        setSortOrder('asc');
        } 
    };

    // Get sort icon

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return(
        <Container>
        <h1>Books</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text>Search </InputGroup.Text>
                <Form.Control placeholder="Cari keyword..." type="text" className="form-control"
                onChange={handleSearch} value={searchQuery}/>
            </InputGroup>

            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th style={{ width: '80px' }}>
                            <Button variant="link"
                            onClick={() => handleSort('id')}
                            className="text-decoration-none text-dark p-0">
                            ID {getSortIcon('id')}
                            </Button>
                        </th>
                        <th style={{ width: '80px' }}>
                            <Button variant="link"
                            onClick={() => handleSort('author')}
                            className="text-decoration-none text-dark p-0">
                            Author {getSortIcon('author')}
                            </Button>
                        </th>
                        <th style={{ width: '80px' }}>
                            <Button variant="link"
                            onClick={() => handleSort('title')}
                            className="text-decoration-none text-dark p-0">
                            Title {getSortIcon('title')}
                            </Button>
                        </th>
                    </tr>
                </thead>
        </Table>

        <ListGroup className="mb-4">
            {data?.data?.map((book) => (
            <ListGroup.Item key={book.id}>
                {book.id}. the book title is {book.title} by {book.author} with category {book.category}
            </ListGroup.Item>
            ))}
        </ListGroup>

        <Container className="mt-3">
            {"Items per Page: "}
            <Form.Select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
                <option key={size} value={size}>
                {size}
                </option>
            ))}
            </Form.Select>
        </Container>

        
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
        />
        </Container>
    )
}

export default BookSearch;
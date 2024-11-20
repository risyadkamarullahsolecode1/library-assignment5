import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = ({ books, handleSort, getSortIcon }) => {
  const confirmDelete = (id) => {
    toast.warn("Are you sure you want to delete this book?", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      onClose: () => {},
      onClick: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      // Replace with API delete call
      // await BookService.deleteBook(id);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete book.");
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => handleSort("isbn")}
              >
                ISBN {getSortIcon("isbn")}
              </Button>
            </th>
            <th>
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => handleSort("title")}
              >
                Title {getSortIcon("title")}
              </Button>
            </th>
            <th>
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => handleSort("author")}
              >
                Author {getSortIcon("author")}
              </Button>
            </th>
            <th>
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => handleSort("category")}
              >
                Category {getSortIcon("category")}
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>
                <Link to={`/books/${book.id}`}>
                  <Button variant="info" size="sm">
                    View
                  </Button>
                </Link>
                <Link to={`/books/edit/${book.id}`} className="ms-2">
                  <Button variant="warning" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => confirmDelete(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </>
  );
};

export default BookList;

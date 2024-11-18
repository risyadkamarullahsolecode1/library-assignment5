import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomButton from '../atoms/Button';
import apiClient from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    apiClient.get('/User')
      .then(response => setMembers(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const confirmDelete = (id) => {
    toast.warn("Are you sure you want to delete this member?", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: true,
      draggable: false,
      pauseOnHover: true,
      hideProgressBar: true,
      onClose: () => {},  // No action on close
      onClick: () => handleDelete(id)  // Proceed with deletion on click
    });
  };

  const handleDelete = (id) => {
    apiClient.delete(`/User/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member.id !== id))
        toast.success("Member deleted successfully!");
      })
      .catch((error) => console.error("Error deleting book:", error));
  };


  return (
    <div>
      <h1>Members</h1>
      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Full Name</th>
            <th>Position</th>
            <th>Previlege</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.firstName} {member.lastName}</td>
              <td>{member.position}</td>
              <td>{member.previlege}</td>
              <td>
                <Link to={`/members/${member.id}`}>
                  <CustomButton variant="info" size="sm">View</CustomButton>
                </Link>
                <Link to={`/members/edit/${member.id}`} className="ms-2">
                  <CustomButton variant="warning" size="sm">Edit</CustomButton>
                </Link>
                <CustomButton
                variant="danger"
                size="sm"
                onClick={() => confirmDelete(member.id)}
              >
                Delete
              </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default MembersPage;

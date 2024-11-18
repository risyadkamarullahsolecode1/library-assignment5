import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberForm from '../molecules/MemberForm';
import apiClient from '../../axiosConfig';

const EditMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null); // For the fetched member data
  const [loading, setLoading] = useState(true); // For the loading state
  const [error, setError] = useState(null); // For errors

  useEffect(() => {
    apiClient
      .get(`/User/${id}`)
      .then((response) => {
        setMember(response.data); 
        setLoading(false); 
      })
      .catch(() => {
        setError('Failed to load member details.');
        setLoading(false); 
      });
  }, [id]);

  const handleUpdateMember = (updatedMember) => {
    apiClient
      .put(`/User/${id}`, updatedMember)
      .then(() => {
        navigate('/members'); 
      })
      .catch(() => {
        setError('Failed to update member.');
      });
  };

  return (
    <div>
      <h1>Edit Member</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MemberForm initialData={member} onSubmit={handleUpdateMember} />
      )}
    </div>
  );
};

export default EditMemberPage;

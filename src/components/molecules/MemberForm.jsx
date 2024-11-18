import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../atoms/Button';
import InputField from '../atoms/InputField';

const MemberForm = ({ onSubmit, initialData = {} }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [libraryCardNumber, setLibraryCardNumber] = useState('');
  const [libraryCardExpDate, setLibraryCardExpDate] = useState('');
  const [position, setPosition] = useState('');
  const [previlege, setPrevilege] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Populate form fields when initialData is updated
    if (initialData.id) {
      setFirstName(initialData.firstName || '');
      setLastName(initialData.lastName || '');
      setLibraryCardNumber(initialData.libraryCardNumber || '');
      setLibraryCardExpDate(initialData.libraryCardExpDate || '');
      setPosition(initialData.position || '');
      setPrevilege(initialData.previlege || '');
      setNote(initialData.note || '');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) newErrors.firstName = ' Name is required.';
    if (!lastName) newErrors.lastName = ' Name is required.';
    //if (!email || !emailRegex.test(email)) newErrors.email = 'Invalid email format.';
    //if (!noHp) newErrors.noHp = 'Phone Number is required.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const memberData = { 
      firstName,
      lastName,
      libraryCardNumber,
      libraryCardExpDate,
      position,
      previlege,
      note,
     };

    // Call the parent onSubmit with the member data
    onSubmit(memberData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
      <InputField label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
      <InputField label="Library Card Number" type="text" value={libraryCardNumber} onChange={(e) => setLibraryCardNumber(e.target.value)} error={errors.libraryCardNumber} />
      <Form.Group controlId="purchaseDate">
          <Form.Label>Library Card Expired Date</Form.Label>
          <Form.Control
          type="date"
          value={libraryCardExpDate}
          onChange={(e) => setLibraryCardExpDate(e.target.value)}
          isInvalid={!!errors.libraryCardExpDate}
          />
          <Form.Control.Feedback type="invalid">{errors.libraryCardExpDate}</Form.Control.Feedback>
      </Form.Group>
      <InputField label="Position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} error={errors.position} />
      <InputField label="Previlege" type="text" value={previlege} onChange={(e) => setPrevilege(e.target.value)} error={errors.previlege} />
      <InputField label="Note" type="text" value={note} onChange={(e) => setNote(e.target.value)} error={errors.note} />

      <CustomButton type="submit" variant="primary">
        {initialData.id ? 'Update Member' : 'Save Member'}
      </CustomButton>
    </Form>
  );
};

export default MemberForm;

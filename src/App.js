import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container, Checkbox, Dropdown, Form, Label, Radio } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { useState } from 'react';
import { conditions } from './conditions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DemographicForm />
        <ConditionsForm />
        <MedicalQuestions />
      </header>
    </div>
  );
}

function DemographicForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [phone, setPhone] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleMaritalStatusChange = (maritalStatus) => {
    setMaritalStatus(maritalStatus);
  }

  const maritalStatuses = [{val: "married"}, {val: "divorced"}, {val: "single"}, {val: "life partner"}, {val: "separated"}, {val: "widowed"}, {val: "other"}];
  return (
    <Container>
      <h1>Demographic Data</h1>
      <Label>Name <Input focus value={name} onChange={handleNameChange} /></Label>
      <Label>Email <Input focus value={email} onChange={handleEmailChange} /></Label>
      <Label>Address <Input focus value={address} onChange={handleAddressChange} /></Label>
      <Label>Gender <Input focus value={gender} onChange={handleGenderChange} /></Label>
      <Label>DOB <Input focus value={dob} onChange={handleDOBChange} /></Label>
      <Label>Phone Number <Input focus value={phone} onChange={handlePhoneChange} /></Label>
      <Form>
          {maritalStatuses.map((maritalStatus, index) =>
            <Form.field>
            <Radio key={index} onClick={() => handleMaritalStatusChange(maritalStatus.val)} label={maritalStatus.val} />
            </Form.field>
          )}
      </Form>
    </Container>
  )
}

function ConditionsForm() {
  const [searchVal, setSearchVal] = useState('');
  const [allConditions, setAllConditions] = useState(conditions);
  const [filterBy, setFilterBy] = useState('Type');

  const handleSearchValChange = (event) => {
    setSearchVal(event.target.value);
    let filteredConditions;
    if (filterBy === "Condition") {
      filteredConditions = conditions.filter(condition => condition.condition.toLowerCase().includes(searchVal.toLowerCase()));
    } else {
      filteredConditions = conditions.filter(condition => condition.type.toLowerCase().includes(searchVal.toLowerCase()));
    }
    setAllConditions(filteredConditions);
    console.log(allConditions);
  }

  const onClickCheckbox = (index) => {
    allConditions[index].isChecked = true;
    setAllConditions(allConditions);
  }

  const options = [{ text: "Condition", key: "Condition", value: "Condition" }, { text: "Type", key: "Type", value: "Type" }];

  const handleDropDown = (event) => {
    setFilterBy(event.target.textContent);
  }

  return (
    <Container>
      <h1>Select Your Medical Conditions</h1>
      <Label>Search by <Dropdown fluid selection options={options} onChange={handleDropDown} /><Input focus value={searchVal} onChange={handleSearchValChange} /></Label>
      {allConditions.map((condition, index) =>
        <Container key={index}>
          <Checkbox onClick={() => onClickCheckbox(index)} label={condition.condition} />
        </Container>
      )}
    </Container>
  )
}

function MedicalQuestions() {
  return (
    <Container>
      <h1>Medical Questions</h1>
      <Label>Do you smoke any tobacco products?</Label>
      <h2>If yes, how much and how often? </h2>

    </Container>
  )
}
export default App;

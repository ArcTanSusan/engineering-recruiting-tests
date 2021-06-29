import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Checkbox, Dropdown, Form, Label, Radio } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { useState } from 'react';
import { conditions } from './conditions';

function App() {
  const [demographicInfo, setSubmittedDemographicInfo] = useState({});
  const [conditionsInfo, setSubmittedConditionsInfo] = useState({})
  const [medicalInfo, setSubmittedMedicalInfo] = useState({})

  const submitDemographicForm = (info) => {
    setSubmittedDemographicInfo(info);
  }

  const submitConditionsInfo = (info) => {
    setSubmittedConditionsInfo(info);
  }

  const submitMedicalInfo = (info) => {
    setSubmittedMedicalInfo(info);
  }

  const submitAPIRequest = (info) => {
    const APIObject = { 
      demographicInfo: demographicInfo, 
      conditionsInfo: conditionsInfo,
      medicalInfo: medicalInfo,
    }
    console.log("Fake API request submitted with the following json request data: ", APIObject);
  }
  return (
    <div className="App">
      <header className="App-header">
        <DemographicForm submit={submitDemographicForm} />
        <ConditionsForm submit={submitConditionsInfo} />
        <MedicalQuestions submit={submitMedicalInfo} />
        <Summary demographicInfo={demographicInfo} conditionsInfo={conditionsInfo} medicalInfo={medicalInfo} />
        <Terms submit={submitAPIRequest} />
      </header>
    </div>
  );
}

function DemographicForm(props) {
  const {submit} = props;
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

  const onSubmit = () => {
    const info = {
      "Name": name,
      "Email": email,
      "Home Address": address,
      "Gender": gender,
      "Date of Birth": dob,
      "Phone Number": phone,
      "Marital Status": maritalStatus,
    }
    submit(info);
  }

  // TODO(susan): The list of marital statuses could be converted into enum, alternatively.
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
      <Label>Marital Status
        {maritalStatuses.map((maritalStatus, index) =>
          <Radio name="group" key={index} onClick={() => handleMaritalStatusChange(maritalStatus.val)} label={maritalStatus.val} />
        )}
      </Label>
      <Button content="Submit" primary onClick={onSubmit} />
    </Container>
  )
}

function ConditionsForm(props) {
  const {submit} = props;
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
  }

  const onClickCheckbox = (index) => {
    allConditions[index].isChecked = !allConditions[index].isChecked;
    setAllConditions(allConditions);
  }

  const options = [{ text: "Condition", key: "Condition", value: "Condition" }, { text: "Type", key: "Type", value: "Type" }];

  const handleDropDown = (event) => {
    setFilterBy(event.target.textContent);
  }

  const onSubmit = () => {
    const info = {
      "conditions": allConditions.filter(condition => condition.isChecked)
    }
    submit(info);
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
    <Button content="Submit" primary onClick={onSubmit} />
    </Container>
  )
}

function MedicalQuestions(props) {
  const {submit} = props;
  const [isSmoker, setIsSmoker] = useState(false);
  const [smokeFreq, setSmokeFreq] = useState('');
  const [isAlcoholUser, setIsAlchoholUser] = useState(false);
  const [drinkFreq, setDrinkFreq] = useState('');
  const [isDrugUser, setIsDrugUser] = useState(false);
  const [drugFreq, setDrugFreq] = useState('');
  const [meds, setMeds] = useState('');
  const [allergies, setAllergies] = useState('');
  const [surgeries, setSurgeries] = useState('');

  const handleSmokeFreq = (event) => {
    setSmokeFreq(event.target.value);
  }

  const handleDrinkFreq = (event) => {
    setDrinkFreq(event.target.value);
  }

  const handleDrugFreq = (event) => {
    setDrugFreq(event.target.value);
  }

  const handleMedsChange = (event) => {
    setMeds(event.target.value);
  }

  const handleAllergiesChange = (event) => {
    setAllergies(event.target.value);
  }

  const handleSurgeriesChange = (event) => {
    setSurgeries(event.target.value);
  }

  const onSubmit = () => {
    const info = {
      "is smoker?": isSmoker,
      "smoke frequency": smokeFreq,
      "is an alcohol user?": isAlcoholUser,
      "drink frequency": drinkFreq,
      "is drug user?": isDrugUser,
      "drug frequency": drugFreq,
      "Current medications": meds,
      "Current allergies": allergies,
      "Past Surgeries and hospital stays": surgeries,
    }
    submit(info);
  }
  return (
    <Container>
      <h1>Medical Questions</h1>
      <Label>Do you smoke any tobacco products?
        <Radio name="smoke" label="Yes" onClick={() => setIsSmoker(true)} />
        <Radio name="smoke" label="No" onClick={() => setIsSmoker(false)} />
      </Label>
      <Label>If yes, how much and how often?<Input val={smokeFreq} onChange={handleSmokeFreq} /></Label>
      <Label>Do you drink alcohol?
        <Radio name="alcohol" label="Yes" onClick={() => setIsAlchoholUser(true)} />
        <Radio name="alcohol" label="No" onClick={() => setIsAlchoholUser(false)} />
      </Label>
      <Label>If yes, how much and how often?<Input val={drinkFreq} onChange={handleDrinkFreq} /></Label>
      <Label>Have you regularly used illicit drugs?
        <Radio name="drug" label="Yes" onClick={() => setIsDrugUser(true)}/>
        <Radio name="drug" label="No" onClick={() => setIsDrugUser(false)}/>
      </Label>
      <Label>If yes, how much and how often?<Input val={drugFreq} onChange={handleDrugFreq} /></Label>
      <h3>Current medications</h3>
      <Label>Please list any medications you are currently taking including non-prescription medications, vitamins and supplements.
      <Input value={meds} onChange={handleMedsChange} /></Label>
      <h3>Medication allergies or reactions</h3>
      <Label>Please list any medication allergies or reactions.
      <Input value={allergies} onChange={handleAllergiesChange} />
      </Label>
      <h3>Surgeries and Hospital Stays</h3>
      <Label>List any surgeries or hospital stays you have had and their approximate date and year.
      <Input value={surgeries} onChange={handleSurgeriesChange} />
      </Label>
      <Button content="Submit" primary onClick={onSubmit} />
    </Container>
  )
}

function Summary(props) {
  const {demographicInfo, conditionsInfo, medicalInfo} = props;
  const conditionsFinal = conditionsInfo && conditionsInfo.conditions && conditionsInfo.conditions.map( condition => condition.condition).join(", ");
  return (
    <Container>
      <h1>Summary of Your Medical Profile</h1>
      <h2>Demographic Info</h2>{Object.entries(demographicInfo).map(obj => {
      return (<h3>{obj[0]}: {obj[1]}</h3>)})}
      <h2>Conditions Info</h2><h3>{conditionsFinal}</h3>
      <h2>Medical Info</h2>{Object.entries(medicalInfo).map(obj => {
      return (<h3>{obj[0]}: {obj[1].toString()}</h3>)})}
    </Container>
  )
}

function Terms(props) {
  const {submit} = props;
  const onSubmit = () => {
    submit();
  }
  return (
    <Container>
      <h1>Terms and Conditions</h1>
      <p>Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.
Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <Button content="Submit" primary onClick={onSubmit} />
    </Container>
  )
}
export default App;

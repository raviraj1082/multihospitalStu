import React, { useEffect, useState } from 'react';

function Appointment(props) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChanges = (e) => {
    setValues(values => ({ ...values, [e.target.name]: e.target.value }))
  }

  const validation = () => {
    let nameErr = true
    let emailErr = true

    if (values.name != undefined) {
      if (values.name == "") {
        setErrors(errors => ({ ...errors, name: "Please enter name" }))
      } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(values.name) === false) {
          setErrors(errors => ({ ...errors, name: "Please enter valid name" }))
        } else {
          setErrors(errors => ({ ...errors, name: "" }))
          nameErr = false;
        }
      }
    }

    if (values.email != undefined) {
      if (values.email == "") {
        setErrors(errors => ({ ...errors, email: "Please enter your email address" }))
      } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(values.email) === false) {
          setErrors(errors => ({ ...errors, email: "Please enter a valid email address" }))
        } else {
          setErrors(errors => ({ ...errors, email: "" }))
          emailErr = false;
        }
      }
    }

    if (values.department != undefined) {
      if (values.department == "0") {
        setErrors(errors => ({ ...errors, department: "Please select department" }))
      } else {
        setErrors(errors => ({ ...errors, department: "" }))
      }
    }

    if ((nameErr || emailErr) == true) {
      return false
    } else {
      return true
    }
  }

  useEffect(
    () => {
      validation()
    },
    [values])


  const submitData = (e) => {
    e.preventDefault();
    let isValid = true  // assume that form is validated

    isValid = validation()

    if (values.name == undefined) {
      setErrors(errors => ({ ...errors, name: "Please enter name" }))
      isValid = false
    }

    if (values.email == undefined) {
      setErrors(errors => ({ ...errors, email: "Please enter email" }))
      isValid = false
    }

    if (values.phone == undefined) {
      setErrors(errors => ({ ...errors, phone: "Please enter phone" }))
      isValid = false
    }

    if (values.date == undefined) {
      setErrors(errors => ({ ...errors, date: "Please enter date" }))
      isValid = false
    }

    if (values.department == undefined) {
      setErrors(errors => ({ ...errors, department: "Please select department" }))
      isValid = false
    }

    if (isValid) {
      return true
    } else {
      return false
    }
  }



  return (
    <main id="main">
      <section id="appointment" className="appointment">
        <div className="container">
          <div className="section-title">
            <h2>Make an Appointment</h2>
            <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
              blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
              Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
          </div>
          <form onSubmit={(e) => submitData(e)} method="post" className="php-email-form">
            <div className="row">
              <div className="col-md-4 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  onChange={(e) => handleChanges(e)}
                />
                <p className="errMsg">{errors.name != undefined ? errors.name : ''}</p>
              </div>
              <div className="col-md-4 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={(e) => handleChanges(e)}
                />
                <p className="errMsg">{errors.email != undefined ? errors.email : ''}</p>
              </div>
              <div className="col-md-4 form-group mt-3 mt-md-0">
                <input type="tel" onChange={(e) => handleChanges(e)} className="form-control" name="phone" id="phone" placeholder="Your Phone" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <p className="errMsg">{errors.phone != undefined ? errors.phone : ''}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group mt-3">
                <input type="datetime" onChange={(e) => handleChanges(e)} name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <p className="errMsg">{errors.date != undefined ? errors.date : ''}</p>
              </div>
              <div className="col-md-4 form-group mt-3">
                <select onChange={(e) => handleChanges(e)} name="department" id="department" className="form-select">
                  <option value="0">Select Department</option>
                  <option value="Department 1">Department 1</option>
                  <option value="Department 2">Department 2</option>
                  <option value="Department 3">Department 3</option>
                </select>
                <p className="errMsg">{errors.department != undefined ? errors.department : ''}</p>
              </div>
            </div>
            <div className="form-group mt-3">
              <textarea className="form-control" name="message" rows={5} placeholder="Message (Optional)" defaultValue={""} />
            </div>
            <div className="mb-3">
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
            </div>
            <div className="text-center"><button type="submit">Make an Appointment</button></div>
          </form>
        </div>
      </section>
    </main>

  );
}

export default Appointment;
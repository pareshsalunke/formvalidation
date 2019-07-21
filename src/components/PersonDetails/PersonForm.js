import React, { Component } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { getCountriesList, getGenderList } from '../../services/country';
import './PersonForm.css';
import 'react-toastify/dist/ReactToastify.css';

// Components
import TextInput from '../Input/Input';
import CustomSelect from '../Select/Select';

class PersonForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         countryList: [],
         nationalityList: [],
      }
   }

   componentDidMount() {
      const countries = getCountriesList().map(country => ({ "value": country.en_short_name, "label": country.en_short_name }));
      const nationalities = getCountriesList().map(country => ({ "value": country.nationality, "label": country.nationality }));

      this.setState({
         countryList: countries,
         nationalityList: nationalities
      });
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const areErrors = !(Object.entries(this.props.errors).length === 0 && this.props.errors.constructor === Object);
      if (areErrors) toast.error('Please resolve all the errors');
      this.props.handleSubmit();
   }

   render() {
      const {
         values,
         touched,
         errors,
         handleChange,
         handleBlur,
         handleReset,
         setFieldValue,
         setFieldTouched,
         isSubmitting,
      } = this.props;
      const { countryList, nationalityList } = this.state;
      return (
         <>
            <ToastContainer />
            <form className="user-form" onSubmit={this.handleSubmit} onReset={handleReset}>
               <TextInput
                  id="firstName"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  error={touched.firstName && errors.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <TextInput
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  error={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <TextInput
                  id="passportNumber"
                  type="text"
                  label="Passport Number"
                  placeholder="S1234567"
                  error={touched.passportNumber && errors.passportNumber}
                  value={values.passportNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <CustomSelect
                  id="issuingCountry"
                  placeholder="Select an issuing country"
                  isSearchable={true}
                  label="Issuing Country"
                  error={touched.issuingCountry && errors.issuingCountry}
                  value={values.issuingCountry}
                  options={countryList}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
               />

               <CustomSelect
                  id="gender"
                  placeholder="Select the gender"
                  isSearchable={true}
                  label="Sex"
                  error={touched.gender && errors.gender}
                  value={values.gender}
                  options={getGenderList()}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
               />

               <CustomSelect
                  id="nationality"
                  placeholder="Select the nationality"
                  isSearchable={true}
                  label="Nationality"
                  error={touched.nationality && errors.nationality}
                  value={values.nationality}
                  options={nationalityList}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
               />

               <TextInput
                  id="dateOfBirth"
                  type="date"
                  label="Date of Birth"
                  placeholder="dd/mm/yyyy"
                  error={touched.dateOfBirth && errors.dateOfBirth}
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <TextInput
                  id="passportExpirationDate"
                  type="date"
                  label="Passport Expiration Date"
                  placeholder="dd/mm/yyyy"
                  error={touched.passportExpirationDate && errors.passportExpirationDate}
                  value={values.passportExpirationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
               />

               <div className="btn-container">
                  <button type="submit" disabled={isSubmitting} className="btn-submit">Submit</button>
               </div>
            </form>
         </>
      )
   }
}

const defaultFormValues = {
   firstName: '',
   lastName: '',
   passportNumber: '',
   issuingCountry: '',
   gender: '',
   nationality: '',
   dateOfBirth: '',
   passportExpirationDate: ''
};

let schema = Yup.object().shape({
   firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Please enter alpha characters only.')
      .required('First name is required.'),
   lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Please enter alpha characters only.')
      .required('Last name is required.'),
   passportNumber: Yup.string()
      .matches(/^(?!^0+$)[a-zA-Z0-9]{6,20}$/, 'Please enter valid passport number')
      .required('Passport number is required!'),
   issuingCountry: Yup.string()
      .ensure()
      .required('Please select the passport issuing country'),
   gender: Yup.string()
      .ensure()
      .required('Please select the relevant option'),
   nationality: Yup.string()
      .ensure()
      .required('Please select the relevant option'),
   dateOfBirth: Yup.date()
      .min(new Date('1/1/1900'), `Please enter valid date - from 1/1/1900`)
      .max(new Date(), 'You cannot enter future date')
      .required('The field is required'),
   passportExpirationDate: Yup.date('')
      .required('The field is required')
      .test('dateOfBirth', 'Expiry date cannot be earlier than Date of birth', function (value) {
         return value > this.parent.dateOfBirth;
      })
});

const formikEnhancer = withFormik({
   validationSchema: schema,
   mapPropsToValues: props => defaultFormValues,
   handleSubmit: (values, { setSubmitting, resetForm, }) => {
      const payload = {
         ...values,
         issuingCountry: values.issuingCountry.value,
         gender: values.gender.value,
         nationality: values.nationality.value
      };

      setTimeout(() => {
         alert(JSON.stringify(payload, null, 2));
         setSubmitting(false);
      }, 1000);

      resetForm(defaultFormValues);
   },
   enableReinitialize: true,
   displayName: 'PersonForm',
});

const WithValidationPersonForm = formikEnhancer(PersonForm);

export default WithValidationPersonForm;
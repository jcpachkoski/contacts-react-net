import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import countryNames from 'the-country-names/list';
import PhoneInput from 'react-phone-number-input';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';

import { validateContact, validatePhoneNumber } from './validateContact';
import CustomAutoSuggest from './CustomAutoSuggest';

const styles = theme => ({
  container: {
    display: 'flex'
  },
  imageDiv: {
    flex: '1',
    textAlign: 'center'
  },
  fieldDiv: {
    flex: '4',
    alignItems: 'flex-start'
  },
  phoneField: {
    marginTop: '16px'
  },
  countryState: {
    marginTop: '13px'
  },
  thumb: {
    verticalAlign: 'top',
    maxWidth: '100px',
    height: 'auto'
  }
});

function ContactForm(props) {

  const { classes, opened, mode, data, closeForm } = props;

  const initialValues = {

    firstname: !data || !data.rowData || data.rowData.firstname === undefined ? '' : data.rowData.firstname,
    lastname: !data || !data.rowData || data.rowData.lastname === undefined ? '' : data.rowData.lastname,
    email: !data || !data.rowData || data.rowData.email === undefined ? '' : data.rowData.email,
    phonenumber: !data || !data.rowData || data.rowData.phone === undefined ? '' : data.rowData.phone,
    street1: !data || !data.rowData || data.rowData.street1 === undefined ? '' : data.rowData.street1,
    street2: !data || !data.rowData || data.rowData.street2 === undefined ? '' : data.rowData.street2,
    city: !data || !data.rowData || data.rowData.city === undefined ? '' : data.rowData.city,
    zipcode: !data || !data.rowData || data.rowData.zipcode === undefined ? '' : data.rowData.zipcode,
    country: !data || !data.rowData || data.rowData.country === undefined ? '' : data.rowData.country,
    state: !data || !data.rowData || data.rowData.state === undefined ? '' : data.rowData.state,
    imageUrl: !data || !data.rowData || data.rowData.imageUrl === undefined || data.rowData.imageUrl === '' ? '/img/unknown.png' : data.rowData.imageUrl
  };

  const [regionList, setRegionList] = React.useState([]);
  const [selectedCountry, setCountry] = React.useState(initialValues.country);
  const [selectedRegion, setRegion] = React.useState(initialValues.state);

  const getCountryNamesAsArray = Object.keys(countryNames).map(isoCode => countryNames[isoCode]);

  const countryList = getCountryNamesAsArray.map(country => {
    const countries = {};
    countries.value = country.name;
    countries.label = country.name;
    countries.regions = country.regions.map(region => {
      const regions = {}
      regions.value = region.name;
      regions.label = region.name;
      return regions;
    });
    return countries;
  });

  const getRegionList = (country) => {
    let tmpList = countryList.filter(c => {
      return c.value === country;
    });
    try {
      if (tmpList && tmpList[0].regions) {
        setRegionList(tmpList[0].regions)
      }
    }
    catch (e) {
      // Do nothing. Country is still being entered
    }
  }


  function PhoneFieldWrapper(props) {
    const {
      input: { name, onChange, value },
      meta,
      ...rest
    } = props;

    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error || !validatePhoneNumber(value)) &&
      meta.modified;

    return (
      <PhoneInput
        {...rest}
        name={name}
        displayInitialValueAsLocalNumber
        className={classes.phoneField}
        country={'US'}
        international={false}
        countryOptions={['US', 'CA', 'MX']}
        placeholder={'Phone Number'}
        indicateInvalid={showError}
        error={showError ? 'Invalid phone number for the selected country' : ''}
        onChange={onChange}
        value={value === '' ? null : value}
      />
    );
  }

  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    // HACK: There is a bug in final-form when using react-autosuggest
    // as explained here https://github.com/final-form/react-final-form/issues/315
    // The side-effect is that the Country and State autosuggest controls
    // are not recognized when data changes, and for instance the form does not
    // get dirty and the corresponding fields do not get values updated. We need
    // to set the form values manually upon submitting like we are doing here.
    values.country = selectedCountry;
    values.state = selectedRegion;

    let tmp = document.getElementById('contactForm');
    console.log("Form: ");
    console.log(tmp);

    window.alert(JSON.stringify(values, 0, 2));
  };

  const handleChange = (name, values) => (event, { newValue }) => {
    if (name === 'country') {
      setCountry(newValue);
      if (newValue) {
        values.country = newValue;
        getRegionList(newValue);
      }
    } else {
      values.state = newValue;
      setRegion(newValue);
    }
  };

  return (
    <Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateContact}
        render={({ handleSubmit, submitting, pristine, invalid, values }) => (
          <form id="contactForm" onSubmit={handleSubmit} noValidate>
            <Dialog disableBackdropClick disableEscapeKeyDown
              fullWidth={true}
              maxWidth={'md'}
              open={opened}
              onClose={closeForm}
              scroll='paper'
              aria-labelledby="contact-form-title"
            >
              <DialogTitle id="contact-form-title"> {mode} Contact</DialogTitle>
              <DialogContent dividers={true}>

                <div className={classes.container}>
                  <div className={classes.imageDiv}>
                    <img src={values.imageUrl} alt={values.imageUrl} className={classes.thumb} />
                  </div>
                  <div className={classes.fieldDiv}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="firstname"
                          component={TextField}
                          type="text"
                          label="First Name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          required
                          fullWidth
                          name="lastname"
                          component={TextField}
                          type="text"
                          label="Last Name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          name="email"
                          required
                          component={TextField}
                          type="email"
                          label="Email"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="phonenumber"
                          component={PhoneFieldWrapper}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          name="street1"
                          component={TextField}
                          label="Street Address"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          name="street2"
                          component={TextField}
                          label="Address (cont)"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          name="city"
                          component={TextField}
                          label="City"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        {/* <Field
                              name="country"
                              component={AutoSuggestWrapper}
                              suggestions={countryList}
                              labelText={'Country'}
                              value={selectedCountry}
                              onChange={(e, val) => handleChange('country', e, val)}
                            /> */}
                        <CustomAutoSuggest
                          id="country"
                          name="country"
                          className={classes.countryState}
                          suggestions={countryList}
                          label="Country"
                          placeholder="Type for a country"
                          value={selectedCountry}
                          onChange={handleChange('country', values)}
                        />

                      </Grid>
                      <Grid item xs={5}>
                        <CustomAutoSuggest
                          id="state"
                          name="state"
                          className={classes.countryState}
                          suggestions={regionList}
                          label="State/Region"
                          placeholder="Type state/region"
                          value={selectedRegion}
                          onChange={handleChange('region', values)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="zipcode"
                          component={TextField}
                          label="Postal Code"
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>

              </DialogContent>
              <DialogActions>
                <Button onClick={closeForm} color="primary" >
                  CANCEL
            </Button>
                <Button type="submit"
                  onClick={() =>
                    // { cancelable: true } required for Firefox
                    // https://github.com/facebook/react/issues/12639#issuecomment-382519193
                    document
                      .getElementById('contactForm')
                      .dispatchEvent(new Event('submit', { cancelable: true }))
                  }
                  disabled={submitting || pristine || invalid}
                  variant="contained"
                  color="primary">
                  SAVE
            </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      />
    </Fragment>
  );
}
ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
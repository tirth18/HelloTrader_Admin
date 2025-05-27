import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';

export interface Broker {
  id?: string;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  parentId: string;
  brokerageShare: number;
  profitLossShare: number;
  type: string;
  accountStatus: string;
  referenceCode: string;
  mcxTrading: boolean;
  equityTrading: boolean;
}

interface CreateUserFormProps {
  onSubmit: (values: Broker) => void;
  onGenerateReferenceCode: () => string;
  existingBrokers: Array<{ id: string; name: string }>;
  isSubmitting?: boolean;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  parentId: Yup.string().required('Parent ID is required'),
  brokerageShare: Yup.number()
    .required('Brokerage share is required')
    .min(0, 'Must be at least 0')
    .max(100, 'Must be at most 100'),
  profitLossShare: Yup.number()
    .required('Profit/Loss share is required')
    .min(0, 'Must be at least 0')
    .max(100, 'Must be at most 100'),
  type: Yup.string().required('Type is required'),
  accountStatus: Yup.string().required('Account status is required'),
  referenceCode: Yup.string().required('Reference code is required'),
});

const CreateUserForm: React.FC<CreateUserFormProps> = ({ 
  onSubmit, 
  onGenerateReferenceCode,
  existingBrokers,
  isSubmitting = false
}) => {
  const initialValues: Broker = {
    username: '',
    firstName: '',
    lastName: '',
    name: '',
    parentId: '',
    brokerageShare: 0,
    profitLossShare: 0,
    type: 'broker',
    accountStatus: 'active',
    referenceCode: '',
    mcxTrading: false,
    equityTrading: false,
  };

  const handleGenerateRefCode = (setFieldValue: (field: string, value: any) => void) => {
    const code = onGenerateReferenceCode();
    setFieldValue('referenceCode', code);
  };

  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await onSubmit(values);
              resetForm();
            } catch (error) {
              console.error('Error creating broker:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Box mb={3}>
                <Typography variant="h6">Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="username"
                      as={TextField}
                      fullWidth
                      label="Username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="firstName"
                      as={TextField}
                      fullWidth
                      label="First Name"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="lastName"
                      as={TextField}
                      fullWidth
                      label="Last Name"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="parentId"
                      as={TextField}
                      fullWidth
                      select
                      label="Parent Broker"
                      SelectProps={{ native: true }}
                      error={touched.parentId && Boolean(errors.parentId)}
                      helperText={touched.parentId && errors.parentId}
                    >
                      <option value="">Select Parent Broker</option>
                      {existingBrokers.map((broker) => (
                        <option key={broker.id} value={broker.id}>
                          {broker.name}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box mb={3}>
                <Typography variant="h6">Business Settings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="brokerageShare"
                      as={TextField}
                      fullWidth
                      type="number"
                      label="Brokerage Share (%)"
                      error={touched.brokerageShare && Boolean(errors.brokerageShare)}
                      helperText={touched.brokerageShare && errors.brokerageShare}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="profitLossShare"
                      as={TextField}
                      fullWidth
                      type="number"
                      label="Profit/Loss Share (%)"
                      error={touched.profitLossShare && Boolean(errors.profitLossShare)}
                      helperText={touched.profitLossShare && errors.profitLossShare}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="type"
                      as={TextField}
                      fullWidth
                      select
                      label="Type"
                      SelectProps={{ native: true }}
                      error={touched.type && Boolean(errors.type)}
                      helperText={touched.type && errors.type}
                    >
                      <option value="broker">Broker</option>
                      <option value="subBroker">Sub Broker</option>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="accountStatus"
                      as={TextField}
                      fullWidth
                      select
                      label="Account Status"
                      SelectProps={{ native: true }}
                      error={touched.accountStatus && Boolean(errors.accountStatus)}
                      helperText={touched.accountStatus && errors.accountStatus}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </Field>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box mb={3}>
                <Typography variant="h6">Reference Code</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Field
                      name="referenceCode"
                      as={TextField}
                      fullWidth
                      label="Reference Code"
                      error={touched.referenceCode && Boolean(errors.referenceCode)}
                      helperText={touched.referenceCode && errors.referenceCode}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      onClick={() => handleGenerateRefCode(setFieldValue)}
                      fullWidth
                    >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box mb={3}>
                <Typography variant="h6">Trading Permissions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Field
                          name="mcxTrading"
                          as={Switch}
                          color="primary"
                        />
                      }
                      label="MCX Trading"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Field
                          name="equityTrading"
                          as={Switch}
                          color="primary"
                        />
                      }
                      label="Equity Trading"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Broker'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm; 
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CreateUserForm from './CreateUserForm';

interface BrokerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (broker: any) => void;
}

const BrokerForm: React.FC<BrokerFormProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Create Broker
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <CreateUserForm onSubmitForm={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default BrokerForm; 
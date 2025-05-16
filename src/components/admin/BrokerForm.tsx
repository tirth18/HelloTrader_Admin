import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateUserForm, { Broker } from '../CreateUserForm';

export type { Broker };

interface BrokerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (broker: Broker) => void;
  existingBrokers: Array<{ id: string; name: string }>;
  isSubmitting?: boolean;
}

const BrokerForm: React.FC<BrokerFormProps> = ({ 
  open, 
  onClose, 
  onSubmit,
  existingBrokers,
  isSubmitting = false
}) => {
  const handleGenerateReferenceCode = () => {
    // Generate a unique reference code
    return `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

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
        <CreateUserForm 
          onSubmit={onSubmit}
          onGenerateReferenceCode={handleGenerateReferenceCode}
          existingBrokers={existingBrokers}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BrokerForm; 
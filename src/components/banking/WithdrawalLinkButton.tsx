import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

interface WithdrawalLinkButtonProps extends ButtonProps {
  buttonText?: string;
}

const WithdrawalLinkButton: React.FC<WithdrawalLinkButtonProps> = ({ 
  buttonText = 'Withdrawal Requests',
  ...buttonProps 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/banking/withdrawal-requests';
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ListAltIcon />}
      onClick={handleClick}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default WithdrawalLinkButton; 
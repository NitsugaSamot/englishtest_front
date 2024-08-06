import React from 'react';
import { Button, Tooltip } from 'antd';
import { ButtonProps } from 'antd/es/button';

interface SendButtonProps extends ButtonProps {
  tooltipText: string;
}

const SendButton: React.FC<SendButtonProps> = ({ tooltipText, ...props }) => {
  return (
    <Tooltip title={tooltipText}>
      <Button 
        type="primary" 
        className="send-button"
        disabled
        {...props}
      >
        Send
      </Button>
    </Tooltip>
  );
};

export default SendButton;

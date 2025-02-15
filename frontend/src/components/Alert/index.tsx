
import React from 'react';

import { Container } from './styles';

interface AlertProps {
  title: string;
  description?: string;
  onClose: () => void;
}

export default function Alert({ title, description, onClose }: AlertProps) {
  setTimeout(() => {
    onClose();
  }, 3000);

  return (
    <Container>
      <h1>{title}</h1>
      <p>{description}</p>
    </Container>
  );
}

import { styled } from '@mui/system';
import { Box, Typography, Link } from '@mui/material';

import { variables } from 'styles/variables';

export const StyledConfirmation = styled(Box)`
  text-align: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${variables.palette.shades0};
  border-radius: 1.25rem;
`;

export const StyledHeader = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.56rem;
  margin: 0 0 0.5rem;
`;

export const StyledSubheader = styled(Typography)`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  margin: 0 0 0.75rem;
`;

export const StyledInfo = styled(Typography)`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 0.875rem;
  margin: 0 0 1.5rem;
`;

export const StyledLink = styled(Link)`
  color: ${variables.palette.primary50};
  text-decoration: underline;
`;

import { styled } from '@mui/system';
import Button from '@mui/material/Button';

import { variables } from 'styles/variables';

export const StyledSignUp = styled('div')`
  width: 100%;
  background-color: ${variables.palette.shadesBG};
`;

export const StyledContainerWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StyledContainer = styled('div')`
  width: 23.5rem;
  margin: 1.5rem 0;
`;

export const StyledSignUpHeader = styled('p')`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.56rem;
  margin: 0 0 1.5rem;
`;

export const StyledForm = styled('form')`
  padding: 1.5rem;
  background-color: ${variables.palette.shades0};
  border-radius: 1.25rem;
`;

export const StyledController = styled('div')`
  margin-bottom: 2.25rem;
`;

export const StyledLabel = styled('p')`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  margin: 0;
`;

export const StyledLink = styled('a')`
  text-decoration: underline;
  color: ${variables.palette.primary50};
`;

export const StyledButton = styled(Button)`
  width: 100%;
  margin: 1.5rem 0;
`;

export const StyledBack = styled('p')`
  color: ${variables.palette.primary50};
  text-align: center;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

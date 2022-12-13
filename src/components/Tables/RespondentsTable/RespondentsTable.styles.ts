import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

import theme from 'styles/theme';
import { variables } from 'styles/variables';
import { StyledFlexTopCenter } from 'styles/styledComponents/Flex';
import { shouldForwardProp } from 'utils/shouldForwardProp';

export const RespondentsTableHeader = styled(Box, shouldForwardProp)`
  margin-bottom: ${theme.spacing(2.4)};
  display: flex;
  justify-content: ${({ hasButton }: { hasButton: boolean }) =>
    hasButton ? 'space-between' : 'center'};
`;

export const StyledButton = styled(Button)`
  svg {
    fill: ${variables.palette.primary};
  }
`;

export const StyledLeftBox = styled(StyledFlexTopCenter)`
  margin-right: ${theme.spacing(1)};
  flex: 0 0 25%;
`;

export const StyledRightBox = styled(Box)`
  margin-left: ${theme.spacing(1)};
  flex: 0 0 25%;
`;

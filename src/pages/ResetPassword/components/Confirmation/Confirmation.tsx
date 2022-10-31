import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import {
  StyledConfirmation,
  StyledHeader,
  StyledSubheader,
  StyledInfo,
  StyledLink,
} from './Confirmation.styles';

export const Confirmation = ({ email }: { email: string }) => {
  const { t } = useTranslation('app');
  const navigate = useNavigate();

  return (
    <StyledConfirmation>
      <StyledHeader>{t('checkYourMail')}</StyledHeader>
      <StyledSubheader>
        {t('weHaveSentPasswordResetLink')}
        <br />
        {email}
      </StyledSubheader>
      <StyledInfo>
        {/*TODO: Add link with information about restoring password*/}
        {t('didntReceiveEmail')} <StyledLink href="#">{t('here')}</StyledLink>
      </StyledInfo>
      <Button variant="contained" type="button" onClick={() => navigate('/auth')}>
        {t('backToLogin')}
      </Button>
    </StyledConfirmation>
  );
};

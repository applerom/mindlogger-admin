import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { useAppDispatch } from 'redux/store';
import { auth, ErrorResponse } from 'redux/modules';
import { page } from 'resources';
import { InputController } from 'components/FormComponents/InputController';
import { CheckboxController } from 'components/FormComponents/CheckboxController';
import { StyledErrorText } from 'styles/styledComponents/ErrorText';

import { AdvancedSettings } from './AdvancedSettings';
import {
  StyledSignUpHeader,
  StyledForm,
  StyledController,
  StyledLabel,
  StyledLink,
  StyledButton,
  StyledBackWrapper,
  StyledBack,
} from './SignUp.styles';
import { signUpSchema } from './SignUp.schema';
import { SignUpData } from './SignUp.types';

export const SignUp = ({ onSubmitForTest }: { onSubmitForTest?: () => void }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('app');
  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema()),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      termsOfService: false,
    },
  });
  const [errorMessage, setErrorMessage] = useState('');

  const termsOfService = watch('termsOfService');

  const onSubmit = async (data: SignUpData) => {
    if (onSubmitForTest) {
      onSubmitForTest();
    }

    const { signUp } = auth.thunk;
    const { termsOfService, ...args } = data;
    const result = await dispatch(signUp({ body: args }));

    if (signUp.fulfilled.match(result)) {
      setErrorMessage('');
    } else if (signUp.rejected.match(result)) {
      const errorObj = result.payload as AxiosError;
      const errorData = errorObj.response?.data as AxiosError<ErrorResponse>;
      if (errorData) {
        setErrorMessage(errorData.message);
      } else {
        setErrorMessage(errorObj.message);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledSignUpHeader>{t('createAccount')}</StyledSignUpHeader>
      <StyledController>
        <InputController fullWidth name="email" control={control} label={t('email')} />
      </StyledController>
      <StyledController>
        <InputController fullWidth name="firstName" control={control} label={t('firstName')} />
      </StyledController>
      <StyledController>
        <InputController fullWidth name="lastName" control={control} label={t('lastName')} />
      </StyledController>
      <StyledController>
        <InputController
          fullWidth
          name="password"
          control={control}
          label={t('password')}
          type="password"
        />
      </StyledController>
      {errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
      <AdvancedSettings />
      <StyledController>
        <CheckboxController
          name="termsOfService"
          control={control}
          label={
            <StyledLabel>
              {t('agreement')}
              <StyledLink href="https://mindlogger.org/terms" target="_blank">
                {t('termsOfService')}
              </StyledLink>
            </StyledLabel>
          }
        />
      </StyledController>
      <StyledButton
        variant="contained"
        type="submit"
        disabled={!termsOfService}
        data-testid="submit-btn"
      >
        {t('createAccount')}
      </StyledButton>
      <StyledBackWrapper>
        <StyledBack onClick={() => navigate(page.login)}>{t('backToLogin')}</StyledBack>
      </StyledBackWrapper>
    </StyledForm>
  );
};

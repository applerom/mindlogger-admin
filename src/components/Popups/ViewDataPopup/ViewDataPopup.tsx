import { RefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'components/Popups';
import { AppletsSmallTable } from 'components/Tables';
import { StyledModalWrapper } from 'styles/styledComponents/Modal';
import { StyledBodyLarge } from 'styles/styledComponents/Typography';
import theme from 'styles/theme';
import { AppletPassword } from 'features/AppletPassword';
import { AppletPasswordRef } from 'features/AppletPassword/AppletPassword.types';

import { ViewDataPopupProps } from './ViewDataPopup.types';

export const ViewDataPopup = ({
  popupVisible,
  setPopupVisible,
  tableRows,
  chosenAppletData,
  setChosenAppletData,
}: ViewDataPopupProps) => {
  const { t } = useTranslation('app');
  const appletPasswordRef = useRef() as RefObject<AppletPasswordRef>;

  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const submitForm = () => {
    if (appletPasswordRef?.current) {
      appletPasswordRef.current.submitForm();
    }
  };

  const showSecondScreen = !!chosenAppletData;

  const handlePopupClose = () => {
    setChosenAppletData(null);
    setPopupVisible(false);
  };

  return (
    <Modal
      open={popupVisible}
      onClose={handlePopupClose}
      onSubmit={submitForm}
      title={showSecondScreen ? t('enterAppletPassword') : t('viewData')}
      buttonText={showSecondScreen ? t('submit') : ''}
      disabledSubmit={disabledSubmit}
      width="66"
    >
      <StyledModalWrapper>
        {showSecondScreen ? (
          <AppletPassword
            ref={appletPasswordRef}
            appletId={chosenAppletData.appletId}
            setDisabledSubmit={setDisabledSubmit}
            submitCallback={() => handlePopupClose()}
          />
        ) : (
          <>
            <StyledBodyLarge sx={{ margin: theme.spacing(-2.4, 0, 2.4) }}>
              {t('viewDataDescription')}
            </StyledBodyLarge>
            <AppletsSmallTable tableRows={tableRows} />
          </>
        )}
      </StyledModalWrapper>
    </Modal>
  );
};

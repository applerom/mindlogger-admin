import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'components/Popups';
import { AppletsSmallTable } from 'components/Tables';
import { StyledModalWrapper } from 'styles/styledComponents/Modal';
import { StyledBodyLarge } from 'styles/styledComponents/Typography';
import theme from 'styles/theme';
import { AppletPassword } from 'features/AppletPassword';

import { ViewDataPopupProps } from './ViewDataPopup.types';

export const ViewDataPopup = ({
  popupVisible,
  setPopupVisible,
  tableRows,
  chosenAppletData,
  setChosenAppletData,
}: ViewDataPopupProps) => {
  const { t } = useTranslation('app');

  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showSecondScreen = !!chosenAppletData;

  const handlePopupClose = () => {
    setChosenAppletData(null);
    setPopupVisible(false);
  };

  const handlePopupSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <Modal
      open={popupVisible}
      onClose={handlePopupClose}
      onSubmit={handlePopupSubmit}
      title={showSecondScreen ? t('enterAppletPassword') : t('viewData')}
      buttonText={showSecondScreen ? t('submit') : ''}
      disabledSubmit={disabledSubmit}
      width="66"
    >
      <StyledModalWrapper>
        {showSecondScreen ? (
          <AppletPassword
            appletId={chosenAppletData.appletId}
            setDisabledSubmit={setDisabledSubmit}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
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

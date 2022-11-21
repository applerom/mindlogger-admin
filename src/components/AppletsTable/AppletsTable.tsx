import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import { Svg } from 'components/Svg';
import { account } from 'redux/modules';
import { Search } from 'components/Search';
import { Table } from 'components/Table';
import { useTimeAgo } from 'hooks';

import { headCells } from './AppletsTable.const';
import { AppletsTableHeader, StyledButtons } from './AppletsTable.styles';

export const AppletsTable = (): JSX.Element => {
  const { t } = useTranslation('app');
  const timeAgo = useTimeAgo();
  const accData = account.useData();
  const [searchValue, setSearchValue] = useState('');

  const formattedApplets = accData?.account?.applets?.map(({ displayName, updated }) => {
    const lastEdited = timeAgo.format(new Date(updated));

    return {
      appletName: {
        content: () => displayName,
        value: displayName,
      },
      lastEdited: {
        content: () => lastEdited,
        value: lastEdited,
      },
      actions: {
        content: () => '',
        value: '',
      },
    };
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <AppletsTableHeader>
        <Search placeholder={t('searchApplets')} onSearch={handleSearch} />
        <StyledButtons>
          <Button variant="roundedOutlined" startIcon={<Svg width={12} height={12} id="plus" />}>
            {t('addApplet')}
          </Button>
        </StyledButtons>
      </AppletsTableHeader>
      <Table
        columns={headCells}
        rows={formattedApplets?.filter(({ appletName }) =>
          appletName?.value.toString().toLowerCase().includes(searchValue.toLowerCase()),
        )}
        orderBy={'appletName'}
      />
    </>
  );
};

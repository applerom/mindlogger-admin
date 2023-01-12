import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Table, Row } from 'components/Tables';
import { Svg, Actions, Search } from 'components';
import { ManagerData, users } from 'redux/modules';
import { useTimeAgo, useBreadcrumbs } from 'hooks';
import { filterRows } from 'utils/filterRows';
import { prepareUsersData } from 'utils/prepareUsersData';
import { EditAccessPopup } from 'components/Popups/EditAccessPopup';
import { RemoveAccessPopup } from 'components/Popups';

import { ManagersTableHeader } from './ManagersTable.styles';
import { getActions, getHeadCells } from './ManagersTable.const';

export const ManagersTable = () => {
  const { id } = useParams();
  const { t } = useTranslation('app');
  const timeAgo = useTimeAgo();
  const managersData = users.useManagerData();
  const [searchValue, setSearchValue] = useState('');
  const [editAccessPopupVisible, setEditAccessPopupVisible] = useState(false);
  const [removeAccessPopupVisible, setRemoveAccessPopupVisible] = useState(false);
  const [selectedManager, setSelectedManager] = useState<
    (ManagerData & { appletIds: string[] }) | null
  >(null);

  useBreadcrumbs([
    {
      icon: <Svg id="manager-outlined" width="15" height="15" />,
      label: t('managers'),
    },
  ]);

  const actions = {
    removeAccessAction: (user: ManagerData & { appletIds: string[] }) => {
      setSelectedManager(user);
      setRemoveAccessPopupVisible(true);
    },
    editAccessAction: () => setEditAccessPopupVisible(true),
  };

  const managersArr = (
    id ? prepareUsersData(managersData?.items, id) : prepareUsersData(managersData?.items)
  ) as ManagerData[];

  const rows = managersArr?.map((user) => {
    const { email, firstName, lastName, updated, roles } = user;
    const isOwner = roles.includes('owner');
    const lastEdited = updated ? timeAgo.format(new Date(updated)) : '';

    return {
      firstName: {
        content: () => firstName,
        value: firstName,
      },
      lastName: {
        content: () => lastName,
        value: lastName,
      },
      email: {
        content: () => email,
        value: email,
      },
      updated: {
        content: () => lastEdited,
        value: lastEdited,
      },
      actions: {
        content: () => <Actions items={getActions(isOwner, id, actions)} context={user} />,
        value: '',
        width: '20%',
      },
    };
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterRows = (rows: Row[]) =>
    rows?.filter(
      ({ firstName, lastName, email }) =>
        filterRows(firstName, searchValue) ||
        filterRows(lastName, searchValue) ||
        filterRows(email, searchValue),
    );

  return (
    <>
      <ManagersTableHeader>
        <Search placeholder={t('searchManagers')} onSearch={handleSearch} />
      </ManagersTableHeader>
      <Table columns={getHeadCells()} rows={handleFilterRows(rows)} orderBy="updated" />
      {removeAccessPopupVisible && selectedManager && (
        <RemoveAccessPopup
          removeAccessPopupVisible={removeAccessPopupVisible}
          onClose={() => setRemoveAccessPopupVisible(false)}
          user={selectedManager}
        />
      )}
      {editAccessPopupVisible && (
        <EditAccessPopup
          editAccessPopupVisible={editAccessPopupVisible}
          onClose={() => setEditAccessPopupVisible(false)}
        />
      )}
    </>
  );
};

import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { SFormSearch } from 'pages/private/dialogs/ui/createGroup/createGroup.styled';
import Input from 'components/ui/inputs/baseInput';
import { SClose, STag, STags } from 'pages/private/dialogs/ui/dialogs.styled';
import HorizontalList from 'components/custom/lists/HorizontalList';
import { ContainerByIcon } from 'shared/styles/containers';
import debounce from 'lodash.debounce';
import { IUser } from 'shared/models/IUser';

interface ISearchAndFilterTags {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handlerSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  picks: IUser[];
  setUsersPick: Dispatch<SetStateAction<IUser[]>>;
}

const SearchAndFilterTags = ({
  handlerSearch,
  search,
  setSearch,
  picks,
  setUsersPick,
}: ISearchAndFilterTags) => {
  const debounceSearch = useMemo(() => debounce(handlerSearch, 500), []);

  const filterPicks = (id: number) => {
    const filterUserIds = picks.filter((userInPick) => userInPick.id !== id);
    setUsersPick(filterUserIds);
  };

  return (
    <SFormSearch>
      <Input
        value={search}
        isBgTransparent
        onInput={debounceSearch}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Введите имя"
      />
      <STags>
        <HorizontalList
          list={picks}
          itemContent={(el) => (
            <STag key={el.id}>
              <div>{el.name}</div>
              <ContainerByIcon>
                <SClose size={5} onClick={() => filterPicks(el.id)} />
              </ContainerByIcon>
            </STag>
          )}
          loading={false}
        />
      </STags>
    </SFormSearch>
  );
};

export default SearchAndFilterTags;

import React, { useMemo } from 'react';
import { HorizontalList } from '@shared/components';
import { ContainerByIcon } from '@shared/styles';
import debounce from 'lodash.debounce';
import { IUser } from '@entities/friends';
import { BaseInput } from '@shared/ui';

import { SClose, SFormSearch, STag, STags } from './searchAndFilterTags.styled';
import { ISearchAndFilterTags } from '../model/ISearchAndFilterTags';

export const SearchAndFilterTags = ({
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
      <BaseInput
        value={search}
        isBgTransparent
        onInput={debounceSearch}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Введите имя"
      />
      <STags>
        <HorizontalList<IUser>
          list={picks}
          itemContent={(el) => (
            <STag key={el.id}>
              <div>{el.name}</div>
              <ContainerByIcon onClick={() => filterPicks(el.id)}>
                <SClose size={20} />
              </ContainerByIcon>
            </STag>
          )}
          loading={false}
        />
      </STags>
    </SFormSearch>
  );
};

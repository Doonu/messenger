import React, { useEffect } from 'react';
import AllContainer from 'components/layouts/all';
import SearchDialogs from 'widgets/forms/searchDialogs';
import { ObserverList } from 'components/custom/lists/ObserverList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  selectorDialogs,
  selectorError,
  selectorHaseMore,
  selectorLoading,
  selectorPage,
} from 'entities/dialogs/dialogs.selectors';
import getAllDialogs from 'shared/api/http/dialogs/getAllDialogs';
import { addPage } from 'entities/dialogs/dialogs.slice';
import { SBlockContainer, SDialogList } from './dialogs.styled';
import Dialog from 'widgets/items/dialog';

const Dialogs = () => {
  const dispatch = useAppDispatch();

  const dialogs = useAppSelector(selectorDialogs);
  const loading = useAppSelector(selectorLoading);
  const page = useAppSelector(selectorPage);
  const haseMore = useAppSelector(selectorHaseMore);
  const error = useAppSelector(selectorError);

  const errorMessage = error ? 'Произошла ошибка' : 'Диалоги не найдены';

  const handlerGetDialogs = () => {
    dispatch(getAllDialogs(1));
  };

  const handlerNextPage = () => {
    dispatch(getAllDialogs(page + 1))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  useEffect(() => {
    handlerGetDialogs();
  }, []);

  return (
    <AllContainer>
      <SBlockContainer>
        <SearchDialogs />
        <SDialogList>
          <ObserverList
            list={dialogs}
            isPending={loading}
            itemContent={(dialog) => <Dialog key={dialog.id} {...dialog} />}
            fetchNextPage={handlerNextPage}
            hasMore={haseMore}
            skeleton={() => <div>...Загрузка</div>}
            notFoundMessage={errorMessage}
          />
        </SDialogList>
      </SBlockContainer>
    </AllContainer>
  );
};

export default Dialogs;

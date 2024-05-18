import React, { FC, useEffect } from 'react';
import { SDialogList } from '../dialogs.styled';
import Dialog from 'widgets/items/dialog';
import SearchDialogs from 'widgets/forms/searchDialogs';
import { ObserverList } from 'components/custom/lists/ObserverList';
import getAllDialogs from 'shared/api/http/dialogs/getAllDialogs';
import { addPage } from 'entities/dialogs/dialogs.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  selectorDialogs,
  selectorError,
  selectorHaseMore,
  selectorLoading,
  selectorPage,
} from 'entities/dialogs/dialogs.selectors';

interface IAllDialogs {
  changeStage: () => void;
}

const AllDialogs: FC<IAllDialogs> = ({ changeStage }) => {
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
    !dialogs.length && handlerGetDialogs();
  }, []);

  return (
    <>
      <SearchDialogs changeServiceCreate={changeStage} />
      <SDialogList>
        <ObserverList
          list={dialogs}
          isPending={loading}
          itemContent={(dialog) => <Dialog key={dialog.id} {...dialog} />}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          skeleton={() => <div>...Загрузка</div>}
          notFoundMessage={errorMessage}
          gap={0}
        />
      </SDialogList>
    </>
  );
};

export default AllDialogs;

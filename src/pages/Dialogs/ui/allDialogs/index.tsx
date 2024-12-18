import React, { FC, useEffect, useRef } from 'react';
import { Dialog } from '@widgets/items';
import { SearchDialogs } from '@widgets/forms';
import { ObserverList } from '@shared/components';
import { getAllDialogs, useDialogHook, messageConverting } from '@shared/api';
import {
  addNewMessage,
  addPage,
  selectorDialogs,
  selectorError,
  selectorDialogsHaseMore,
  selectorLoading,
  selectorPage,
  selectorDialogsSearch,
} from '@entities/dialogs';
import { useAppSelector, useAppDispatch } from '@shared/hooks';

import { SDialogList } from '../dialogs.styled';

interface IAllDialogs {
  changeStage: () => void;
}

const AllDialogs: FC<IAllDialogs> = ({ changeStage }) => {
  const dispatch = useAppDispatch();

  const refDialogs = useRef<HTMLDivElement>(null);

  const dialogs = useAppSelector(selectorDialogs);
  const loading = useAppSelector(selectorLoading);
  const page = useAppSelector(selectorPage);
  const haseMore = useAppSelector(selectorDialogsHaseMore);
  const error = useAppSelector(selectorError);
  const search = useAppSelector(selectorDialogsSearch);

  const errorMessage = error ? 'Произошла ошибка' : 'Диалоги не найдены';

  const handlerGetDialogs = () => {
    dispatch(getAllDialogs({ page: 1, search }));
  };

  const handlerNextPage = async () => {
    dispatch(getAllDialogs({ page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  useDialogHook({
    createMessage: (data) => dispatch(addNewMessage(messageConverting(data))),
  });

  useEffect(() => {
    handlerGetDialogs();
  }, [search]);

  return (
    <>
      <SearchDialogs changeServiceCreate={changeStage} />
      <SDialogList ref={refDialogs}>
        <ObserverList
          list={dialogs}
          isPending={loading && page === 1}
          itemContent={(dialog) => <Dialog key={dialog.id} {...dialog} />}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          isFetching={loading && page > 1}
          skeleton={(el) => <div key={el}>...Загрузка</div>}
          notFoundMessage={errorMessage}
          gap={2}
          refContainer={refDialogs}
        />
      </SDialogList>
    </>
  );
};

export default AllDialogs;

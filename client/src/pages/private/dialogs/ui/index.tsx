import React, { useEffect, useState } from 'react';
import AllContainer from 'components/layouts/all';
import { IStage } from '../model/IStage';
import AllDialogs from './allDialogs';
import CreateGroup from './createGroup';
import { SBlockContainer } from './dialogs.styled';
import { useAppDispatch } from 'hooks/redux';
import { setDialogs } from 'entities/dialogs/dialogs.slice';

const Dialogs = () => {
  const dispatch = useAppDispatch();

  const [stage, setStage] = useState<IStage>('allDialogs');

  const navigateCreateGroup = () => setStage('createGroup');
  const navigateAllDialogs = () => setStage('allDialogs');

  useEffect(() => {
    return () => {
      dispatch(setDialogs([]));
    };
  }, []);

  return (
    <AllContainer>
      <SBlockContainer>
        {stage === 'allDialogs' && <AllDialogs changeStage={navigateCreateGroup} />}
        {stage === 'createGroup' && <CreateGroup changeStage={navigateAllDialogs} />}
      </SBlockContainer>
    </AllContainer>
  );
};

export default Dialogs;

import React, { useEffect, useState } from 'react';
import { AllContainer } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { setDialogs } from '@entities/dialogs';

import { IStage } from '../model/IStage';
import AllDialogs from './allDialogs';
import CreateGroup from './createGroup';
import { SBlockContainer } from './dialogs.styled';

export const Dialogs = () => {
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

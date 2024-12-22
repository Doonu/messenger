import React, { useEffect, useState } from 'react';
import { AllContainer } from '@app/layouts';
import { useAppDispatch } from '@shared/hooks';
import { setDialogs } from '@entities/dialogs';

import AllDialogs from './AllDialogs/AllDialogs';
import { StageTypes } from '../model/stage.types';
import CreateGroup from './CreateGroup/CreateGroup';
import { SBlockContainer } from './dialogs.styles';

const Dialogs = () => {
  const dispatch = useAppDispatch();

  const [stage, setStage] = useState<StageTypes>('allDialogs');

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

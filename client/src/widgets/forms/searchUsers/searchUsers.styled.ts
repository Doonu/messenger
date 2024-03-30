import styled from 'styled-components';
import BaseButton from 'components/ui/buttons/baseButton';

export const SContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SBaseButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  border-radius: 0 5px 5px 0;
`;

import styled from 'styled-components';
import { Typography } from 'antd';

interface ISContainerHandler {
  $isView: boolean;
}

export const SContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 5px;
`;

export const SContainerHandle = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  align-self: normal;
`;

export const SContainerRow = styled.div<ISContainerHandler>`
  display: flex;
  gap: 15px;

  margin-right: 20px;
  visibility: ${({ $isView }) => ($isView ? '' : 'hidden')};
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

export const SLike = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.active};
`;

export const SNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SName = styled(Typography.Text)`
  color: ${({ theme }) => theme.colors.active};
  font-size: 16px;
  font-weight: 700;
  line-height: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SComment = styled.div`
  color: ${({ theme }) => theme.colors.active};

  & > div {
    margin-bottom: 10px;
  }
`;

export const STime = styled.span`
  margin-top: 25px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SDelete = styled.div`
  cursor: pointer;
`;

export const SIcon = styled.div`
  cursor: pointer;
`;

export const SContainerEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SContainerButtons = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

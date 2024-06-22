import React, { FC } from 'react';
import { Empty as EmptyAntd, EmptyProps } from 'antd';
import styled from 'styled-components';
import { FaBoxOpen } from 'react-icons/fa';

interface IEmpty extends EmptyProps {
  message: string;
}

const Empty: FC<IEmpty> = ({ message, ...props }) => {
  return (
    <SEmptyAntd
      image={<FaBoxOpen size={80} />}
      description={<SMessage>{message}</SMessage>}
      {...props}
    ></SEmptyAntd>
  );
};
export default Empty;

export const SEmptyAntd = styled(EmptyAntd)`
  & .ant-empty-image svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SMessage = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 1000;
  text-transform: uppercase;
`;

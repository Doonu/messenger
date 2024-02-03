import styled from 'styled-components';
import MainProfile from '../../../custom/profiles/main';

export const SContainer = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 90px;
  justify-content: space-between;
  padding: 0 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    & > div:nth-child(3) {
      display: none !important;
    }
  }
`;

export const STitle = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
`;

export const SMainProfile = styled(MainProfile)`
  margin-left: 80px;
`;

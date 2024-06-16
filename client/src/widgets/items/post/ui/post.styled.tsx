import styled, { css } from 'styled-components';

interface ISContainer {
  $isWarning?: boolean;
}

export const SContainer = styled.div<ISContainer>`
  padding: 0;
  max-width: 100%;

  ${({ $isWarning }) =>
    $isWarning &&
    css`
      @keyframes glowing {
        0% {
          border-color: ${({ theme }) => theme.colors.danger};
          box-shadow: 0 0 5px ${({ theme }) => theme.colors.danger};
        }
        50% {
          border-color: #e83b3c;
          box-shadow: 0 0 20px #e83b3c;
        }
        100% {
          border-color: ${({ theme }) => theme.colors.danger};
          box-shadow: 0 0 5px ${({ theme }) => theme.colors.danger};
        }
      }

      animation: glowing 1300ms infinite;
    `}
`;

export const STop = styled.div`
  padding: 15px;
`;

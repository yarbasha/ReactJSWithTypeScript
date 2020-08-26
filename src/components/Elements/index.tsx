import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.main};
  padding: 10px;
  color: ${({ theme }) => theme.postFontColor} ;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .5px;
  border: solid 2px ${({ theme }) => theme.postFontColor};
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
  transition: .5s;
  :hover {
    background-color: ${({ theme }) => theme.postFontColor};
    color: ${({ theme }) => theme.main};
    border: solid 2px ${({ theme }) => theme.main};
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.main};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const P = styled.p`
  color: ${({ theme }) => theme.postFontColor};
  line-height: 22px;
  margin-bottom: 10px;
  margin-top: 10px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  ::after{
    content: "."
  }
`;
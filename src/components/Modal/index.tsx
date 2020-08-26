import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { User } from '../../redux/users/types';
import { Post } from '../../redux/posts/types';
import { Comment } from '../../redux/comments/types';
import { Button, Title } from '../Elements';

const fadein = keyframes`
  from {
    transform: rotate(180deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
`;

const opacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Modal = styled.div<{ closing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.postColor}70;
  color: ${({ theme }) => theme.main};
  width: 100vw;
  height: 100vh;
  padding: 15vh 20vw;
  opacity: ${({ closing }) => closing ? '0' : '1'};
  transition: opacity 1s;
  animation: ${opacity} 1s;
  z-index: 100;
`;

const ModalContainer = styled.div<{ closing: boolean }>`
  background: linear-gradient( 45deg, ${({ theme }) => theme.postColor} 0%, ${({ theme }) => theme.secondary} 50%, ${({ theme }) => theme.postColor} 100%);
  width: 100%;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.main};
  border-radius: 20px;
  animation: ${fadein} 1s;
  transform: ${({ closing }) => closing ? 'scale(0) rotate(-180deg)' : 'scale(1)'};
  transition: transform 1s;
`;

const ModalHeader = styled.header`
  width: 100%;
  height: 20%;
  border: solid 3px ${({ theme }) => theme.main};
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
`;

const HeaderTitle = styled(Title)`
  margin-top: 10px;
  text-align: center;
  margin-left: auto;
  color: ${({ theme }) => theme.postFontColor};
  ::before, ::after {
    content: "";
    width: 20px;
    height: 0;
    border: solid 8px;
    display: inline-block;
    border-color: transparent;
  }
  ::before {
    border-left-color: ${({ theme }) => theme.postFontColor};
  }
  ::after{
    border-right-color: ${({ theme }) => theme.postFontColor}  ;
  }
`;

const SectionTitle = styled(HeaderTitle)`
  margin-left: initial;
  ::after, ::before {
    width: 100px;
    height: 8px;
    border: initial;
    border-top: solid 2px ${({ theme }) => theme.postFontColor};
    margin: 0 10px;
  }
`;

const Close = styled.span`
  font-size: 40px;
  align-self: flex-start;
  margin-left: auto;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    color: ${({ theme }) => theme.postFontColor};
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 70%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 10px;
  }
`;

const Info = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 500;
`;

const Span = styled.span`
  display: block;
  line-height: 20px;
  letter-spacing: 1px;
  ::after{
    content: "."
  }
`;

const Bold = styled.b`
  color: ${({ theme }) => theme.postFontColor};
`;

const ModalFooter = styled.footer`
  display: flex;
  height: 10%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;

const ModalButton = styled(Button)`
  margin: 0;
  align-self: initial;
`;

interface Props {
  user: User;
  post: Post;
  comments: Comment[];
  toggle: () => void;
}

const ModalView: React.FC<Props> = ({ post, user, comments, toggle }) => {

  const [closing, setClosing] = useState(false);

  const closeModal = (): void => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      toggle();
    }, 1000);
  }

  return (
    <Modal closing={closing}>
      <ModalContainer closing={closing}>
        <ModalHeader>
          <HeaderTitle>{post.title}</HeaderTitle>
          <Close onClick={closeModal}>&times;</Close>
        </ModalHeader>
        <ModalContent>
          <SectionTitle>Author Information</SectionTitle>
          <Info>
            <Span><Bold>Name: </Bold>{user.name}</Span>
            <Span><Bold>Email: </Bold>{user.email}</Span>
            <Span><Bold> City: </Bold>{user.address.city}</Span>
            <Span><Bold> Phone: </Bold>{user.phone}</Span>
          </Info>
          <SectionTitle>Comments</SectionTitle>
          {comments.map(comment =>
            <Info key={comment.id}>
              <Span><Bold>Name: </Bold>{comment.name}</Span>
              <Span><Bold>Email: </Bold>{comment.email}</Span>
              <Span><Bold>Comment: </Bold>{comment.body}</Span>
            </Info>)}
        </ModalContent>
        <ModalFooter>
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
}

export default ModalView;
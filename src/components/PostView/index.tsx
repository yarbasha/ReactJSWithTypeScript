import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { User } from '../../redux/users/types';
import { Post } from '../../redux/posts/types';
import { Comment } from '../../redux/comments/types';

const Border = styled.div`
  background: repeating-linear-gradient(45deg, ${({ theme }) => theme.main}, ${({ theme }) => theme.secondary} 5%, ${({ theme }) => theme.main} 10%);
  width: 30%;
  min-width: 350px;
  min-height: 375px;
  margin: 20px;
  padding: 4px;
  border-radius: 15px;
`;

const Container = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.postColor} 0%, ${({ theme }) => theme.secondary} 50%, ${({ theme }) => theme.postColor} 100%);
  height: 100%;
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.main};
  text-align: center;
  letter-spacing: 1px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const H4 = styled.h4`
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

const Button = styled.button`
  background-color: ${({ theme }) => theme.main};
  padding: 10px 20px;
  color: ${({ theme }) => theme.postColor} ;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .5px;
  border: solid 2px ${({ theme }) => theme.postColor};
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 10px;
  transition: .5s;
  :hover {
    background-color: ${({ theme }) => theme.postColor};
    color: ${({ theme }) => theme.main};
    border: solid 2px ${({ theme }) => theme.main};
  }
`;

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

const Modal = styled.div<{ open: boolean }>`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.main};
  width: 100vw;
  height: 100vh;
  padding: 15vh 20vw;
  animation: ${fadein} 1s;
`;

const ModalContainer = styled.div`
  background: linear-gradient( 45deg, ${({ theme }) => theme.main} -30%, ${({ theme }) => theme.secondary} 50%, ${({ theme }) => theme.main} 130%);
  width:100%;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.main};
  border-radius: 20px;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  border: solid 3px ${({ theme }) => theme.main};
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
`;

const H2Header = styled(H2)`
  margin-left: auto;
`;

const Close = styled.span`
  font-size: 40px;
  align-self: flex-start;
  margin-left: auto;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    color: ${({ theme }) => theme.secondary};
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

const Title = styled.h3`
  margin-top: 10px;
  text-align: center;
  ::after{
    content: "";
    width: 100px;
    height: 8px;
    margin-left: 10px;
    border-top: solid 2px ${({ theme }) => theme.main};
    display: inline-block;
  }
  ::before{
    content: "";
    width: 100px;
    margin-right: 10px;
    height: 8px;
    border-top: solid 2px ${({ theme }) => theme.main};
    display: inline-block;
  }
`;

const UserInfo = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 500;
`;

const CommentInfo = styled.div`
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

const ModalFooter = styled.footer`
  display: flex;
  height: 10%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;

interface Props {
  user: User;
  post: Post;
  comments: Comment[]
}

const PostView: React.FC<Props> = ({ post, user, comments }) => {
  const [open, setOpen] = useState(false);

  const toggle = (): void => {
    setOpen(state => !state);
  }

  return (
    <Border>
      <Container>
        <H2>{post.title}</H2>
        <H4>{post.body}</H4>
        <Button onClick={toggle}>More Details</Button>
        <Modal open={open}>
          <ModalContainer>
            <ModalHeader>
              <H2Header>{post.title}</H2Header>
              <Close onClick={toggle}>&times;</Close>
            </ModalHeader>
            <ModalContent>
              <Title>Author Information</Title>
              <UserInfo>
                <Span><b>Name: </b>{user.name}</Span>
                <Span><b>Email: </b>{user.email}</Span>
                <Span><b> City: </b>{user.address.city}</Span>
                <Span><b> Phone: </b>{user.phone}</Span>
              </UserInfo>
              <Title>Comments</Title>
              {comments.map(comment =>
                <CommentInfo key={comment.id}>
                  <Span><b>Name: </b>{comment.name}</Span>
                  <Span><b>Email: </b>{comment.email}</Span>
                  <Span><b>Comment: </b>{comment.body}</Span>
                </CommentInfo>)}
            </ModalContent>
            <ModalFooter>
              <Button onClick={toggle}>OK</Button>
            </ModalFooter>
          </ModalContainer>
        </Modal>
      </Container>
    </Border>
  );
}

export default PostView;
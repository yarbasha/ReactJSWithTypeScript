import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { User } from '../../redux/users/types';
import { Post } from '../../redux/posts/types';
import { Comment } from '../../redux/comments/types';
import ModalView from '../Modal';

const postAnimation = keyframes`
  0%{
    transform: translateY(-14px);
  }
  33%{
    transform: translateY(0px);
  }
  66%{
    transform: translateY(-4px);
  }
  100%{
    transform: translateY(0px);
  }
`;

const Border = styled.div`
  background: repeating-linear-gradient(45deg, ${({ theme }) => theme.main}, ${({ theme }) => theme.postFontColor} 5%, ${({ theme }) => theme.main} 10%);
  width: 30%;
  min-width: 350px;
  min-height: 375px;
  margin: 20px;
  padding: 4px;
  border-radius: 15px;
  animation: ${postAnimation} 1s;
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
  color: ${({ theme }) => theme.postFontColor} ;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .5px;
  border: solid 2px ${({ theme }) => theme.postFontColor};
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 10px;
  transition: .5s;
  :hover {
    background-color: ${({ theme }) => theme.postFontColor};
    color: ${({ theme }) => theme.main};
    border: solid 2px ${({ theme }) => theme.main};
  }
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
        {open &&
          <ModalView post={post} user={user} comments={comments} toggle={toggle} />}
      </Container>
    </Border>
  );
}

export default PostView;
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { User } from '../../redux/users/types';
import { Post } from '../../redux/posts/types';
import { Comment } from '../../redux/comments/types';
import ModalView from '../Modal';
import { Button, P, Title } from '../Elements';

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

const HeaderTitle = styled(Title)`
  font-size: 22px;
  text-align: center;
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
        <HeaderTitle>{post.title}</HeaderTitle>
        <P>{post.body}</P>
        <Button onClick={toggle}>More Details</Button>
        {open &&
          <ModalView post={post} user={user} comments={comments} toggle={toggle} />}
      </Container>
    </Border>
  );
}

export default PostView;
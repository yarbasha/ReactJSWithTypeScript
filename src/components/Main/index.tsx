import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUsers } from '../../redux/users/actions';
import { fetchPosts } from '../../redux/posts/actions';
import { fetchComments } from '../../redux/comments/actions';
import ModalView from '../Modal';
import { Post } from '../../redux/posts/types';
import { User } from '../../redux/users/types';
import { Comment } from '../../redux/comments/types';
import { Button, P, Title } from '../Elements';

const Container = styled.div`
  background: repeating-linear-gradient( 90deg, ${({ theme }) => theme.main}, ${({ theme }) => theme.secondary} 25%, ${({ theme }) => theme.main} 50%);
  position: relative;
  padding: 5%;
  ::before {
    content: '';
    height: 100%;
    width: 2px; 
    background-color: ${({ theme }) => theme.postFontColor};
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -1px;
  }
`;

const Year = styled.div<{ text: string }>`
  position: relative;
  height: 30px;
  ::after {
    content: "${({ text }) => text}";
    text-align: center;
    width: 60px;
    color: #fff;
    background-color: coral;
    border: solid 0.5px #fff;
    position: absolute;
    left: 50%;
    top: 0px;
    margin-left: -30px;
    border-radius: 5px;
  }
`;

const Content = styled.div<{ right: boolean }>`
  background: linear-gradient(to right, ${({ theme }) => theme.postColor} 0%, ${({ theme }) => theme.secondary} 50%, ${({ theme }) => theme.postColor} 100%);
  float: ${({ right }) => right ? 'right' : 'left'};
  padding: 10px 10px;
  width: calc(50% - 25px);
  position: relative;
  margin-bottom: 10px;
  ::after, ::before {
    content: '';
    position: absolute;
    top: 15px;
  } 
  ::after {
    border: solid 10px;
    border-color: transparent;
    ${({ right }) => right ? css`
      border-right-color:  ${({ theme }) => theme.postColor};
      left: -20px;
    `: css`
      border-left-color: ${({ theme }) => theme.postColor};
      right: -20px;
    `}
  }
  ::before {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.postColor};
    border: solid 3px ${({ theme }) => theme.postFontColor};
    ${({ right }) => right ? css`
      left: -35px;
    `: css`
      right: -35px;
    `}
  }
`;

const Clear = styled.div`
  clear: both;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;



interface Props {
  post: Post;
  user: User;
  comments: Comment[];
}

const View: React.FC<Props> = ({ post, user, comments }) => {
  const [open, setOpen] = useState(false);
  const toggle = (): void => {
    setOpen(state => !state);
  }
  return (
    <>
      {(post.id % 10 === 0 || post.id === 1) && <Year text={Math.round(2020 - post.id / 10).toString()} />}
      <Content right={post.id % 2 === 0}>
        <Title>{post.title}</Title>
        <P>{post.body}</P>
        <ButtonContainer>
          <Button onClick={toggle}>More Details</Button>
        </ButtonContainer>
        {open &&
          <ModalView post={post} user={user} comments={comments} toggle={toggle} />}
      </Content>
      <Clear /></>
  );
}

const Main: React.FC = () => {

  const dispatch = useDispatch();
  const { loading, users } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.posts);
  const { comments } = useSelector((state: RootState) => state.comments);


  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);


  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Container>
        {posts.map(post => {
          const user = users.filter(user => user.id === post.userId)[0];
          const postComments = comments.filter(comment => comment.postId === post.id);
          return <View key={post.id} post={post} user={user} comments={postComments} />
        })}
      </Container>
    );
  }
}

export default Main;
import React from 'react';
import styled from 'styled-components';
import { User } from '../../redux/users/types';
import { Post } from '../../redux/posts/types';
import { Comment } from '../../redux/comments/types';

const Container = styled.div`
  background: linear-gradient(to right, #c2c2c2 0%, #fff 50%, #c2c2c2 100%);
  margin-bottom: 20px;
  padding: 20px 50px;
  border-radius: 15px;
`;

const H3 = styled.h3`
  color: darkred;
`;

const Summary = styled.summary`
  color: darkred;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const UserInfo = styled.div`
  padding: 10px 20px;
  color: darkmagenta;
`;

const CommentInfo = styled.div`
  padding: 10px 20px;
  color: darkgoldenrod;
`;

interface Props {
  user: User;
  post: Post;
  comments: Comment[]
}

const PostView: React.FC<Props> = ({ post, user, comments }) => {
  return (
    <Container>
      <H3>Title: </H3>
      <span>{post.title}</span>
      <H3> Post: </H3><span>{post.body}</span>
      <details>
        <Summary>Author: {user.name} </Summary>
        <UserInfo >
          <h5>Email: </h5>
          <span>{user.email}</span>
          <h5> City: </h5>
          <span>{user.address.city}</span>
          <h5> Phone: </h5>
          <span>{user.phone}</span>
        </UserInfo>
      </details>
      <details>
        <Summary>Comments</Summary>
        {comments.map(comment =>
          <CommentInfo key={comment.id}>
            <h5>Name: </h5>
            <span>{comment.name}</span>
            <h5> Email: </h5>
            <span>{comment.email}</span>
            <h5> Body: </h5>
            <span>{comment.body}</span>
          </CommentInfo>)}
      </details>
    </Container>
  );
}

export default PostView;
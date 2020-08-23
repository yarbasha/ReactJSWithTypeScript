import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/users/actions';
import { RootState } from '../../redux/store';
import { fetchPosts } from '../../redux/posts/actions';
import { fetchComments } from '../../redux/comments/actions';
import PostView from '../PostView';



const Container = styled.div`
  background-color: #c2c2c2;
  padding: 20px;
  color: darkslateblue;
`;



const Home: React.FC = () => {

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
          return <PostView key={post.id} post={post} user={user} comments={postComments} />;
        }
        )}
      </Container>
    );
  }
};

export default Home;
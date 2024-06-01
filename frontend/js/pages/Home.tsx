import {format} from "date-fns";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import isAuthenticated from "utils/isAuthenticated";
import {ApiService, Post, User} from "../api";
import "../../sass/pages/home.scss";
import {userName, userSlug} from "components/PrivateRoute";
import {Link} from "react-router-dom";
import {PostList} from "pages/Commons";



const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await ApiService.apiPostsList();
        console.log("Post", postsResponse); // Verifique se os posts são recuperados corretamente

        setPosts(postsResponse.results);

        if (isAuthenticated()) {


        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Executa somente uma vez, após a montagem do componente

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      requestBody: {
        id: "",
        title,
        content,
        created: "",
        modified: "",
        author: 0,
        author_name: "",
        comments: [],
        is_draft: isDraft,
      },
    };

    try {
      const response = await ApiService.apiPostsCreate(data);
      console.log("Post created successfully:", response);
      // Limpar o formulário após o envio bem-sucedido
      setTitle("");
      setContent("");

      // Após criar o post, atualize a lista de posts
      ApiService.apiPostsList().then((response) => {
        setPosts(response.results);
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const handleCommentSubmit = async (postId: string, event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      requestBody: {
        id: '',
        content,
        created: "",
        modified: "",
        author: 0,
        author_name: "",
        post: postId,
      },
    };

    try {
      const response = await ApiService.apiCommentsCreate(data);
      console.log("Comment created successfully:", response);
      // Limpar o formulário após o envio bem-sucedido
      setContent("");

      // Atualizar os comentários do post após adicionar um novo
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, response],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const commentIsAuthenticated = () => {
    if (isAuthenticated()) {
      return (
        <>
          <Form.Group controlId="formContent">
            <Form.Label/>
            <Form.Control
              as="textarea"
              placeholder="Enter your reply"
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <div className="text-end">
            <Button className="mt-3" type="submit">
              Reply
            </Button>
          </div>
        </>

      );
    }
    return (
      <p>
        Please <a href="/">login</a> to comment.
      </p>
    );
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const postIsAuthenticated = () => {
    if (isAuthenticated()) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsDraft">
            <Form.Check
              type="checkbox"
              label="Is Drafted"
              checked={isDraft}
              onChange={(e) => setIsDraft(e.target.checked)}
            />
          </Form.Group>


          <Button className="mt-3" type="submit">
            Create a post
          </Button>

        </Form>
      );
    }
    return (
      <p>
        Please <a href="/">login</a> to create a post.
      </p>
    );
  };
  const yourLatestPostsIsAuthenticated = () => {
    if (isAuthenticated()) {
      return <></>;
    }
    return (
      <p>
        Please <a href="/">login</a> to see your latest posts .
      </p>
    );
  };
  const postIsAuthenticatedManager = () => {
    if (isAuthenticated()) {
      return (

        <Link to="/posts_manage">
          <Button>Manage Posts</Button>
        </Link>

      )
    }
    return (
      <p>
        Please <a href="/">login</a> to manage your posts.
      </p>
    );
  };


  return (
    <Container className="full-home" fluid>
      <Row className="mt-3 mb-3"/>

      <Row className="mt-3">
        <Col md={4}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title className="mt-3">{capitalizeFirstLetter(userName)}</Card.Title>
                <Card.Text>@{userSlug}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="mt-3" md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Manage your posts</Card.Title>
                <Card.Text>Manage your blog posts here.</Card.Text>
                {postIsAuthenticatedManager()}
              </Card.Body>
            </Card>
          </Col>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Create a new Post</Card.Title>
              {postIsAuthenticated()}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="latest-posts-title">
                Your Latest Posts
              </Card.Title>
              <Card.Text>
                <ul className="latest-posts-list">
                  {yourLatestPostsIsAuthenticated()}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}><PostList posts={posts} commentIsAuthenticated={commentIsAuthenticated}
                              handleCommentSubmit={handleCommentSubmit}/></Col>
      </Row>
    </Container>

  );
};
export default Home;

import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {ApiService, Post} from "api";
import isAuthenticated from "utils/isAuthenticated";
import {useParams} from "react-router";
import {PostList} from "pages/Commons";
import Form from "react-bootstrap/Form";


const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const {userSlug} = useParams();

  useEffect(() => {
    console.log("User Slug", userSlug);
    const fetchData = async () => {
      try {
        const data = {
          slug: ""
        }
        if (userSlug) {
          data.slug = userSlug;
        }
        const postsResponse = await ApiService.apiPostsBySlugList(data);
        console.log("Post", postsResponse.results); // Verifique se os posts são recuperados corretamente

        setPosts(postsResponse.results);

        if (isAuthenticated()) {


        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <Container className="full-home" fluid>
      <Row className="mt-3 mb-3"/>

      <Row className="mt-3">
        {/* Seção para exibir detalhes do perfil do usuário */}
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={3}></Col>
        <Col md={8}><PostList posts={posts} commentIsAuthenticated={commentIsAuthenticated}
                              handleCommentSubmit={handleCommentSubmit}/></Col>
      </Row>
    </Container>
  );
};

export default Profile;

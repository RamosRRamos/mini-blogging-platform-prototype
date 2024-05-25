# Blog MVP

## Descrição do Projeto

Este é um MVP (Minimum Viable Product) de um blog onde os usuários podem criar, ler, deletar posts e comentar nas postagens de outros. O projeto é desenvolvido utilizando Python Django no backend e React no frontend.

## Objetivos do Protótipo

- Criar um blog simples e funcional onde os usuários podem interagir com postagens e comentários.
- Foco na usabilidade e funcionalidades essenciais.

## Use Cases

### 1. User Registration
**Actor**: Visitor  
**Description**: A visitor creates a new user account to access additional blog features.

**Main Flow**:
1. Visitor accesses the registration page.
2. Visitor fills out the form with a username, email, and password.
3. System validates the information and creates a new user account.
4. System redirects the user to the login page.

**Alternate Flows**:
- 2a. Visitor provides invalid information and the system returns error messages.

### 2. User Login
**Actor**: User  
**Description**: An existing user logs in to access their account and restricted blog features.

**Main Flow**:
1. User accesses the login page.
2. User fills out the form with their username and password.
3. System validates the credentials and authenticates the user.
4. System redirects the user to the main blog page.

**Alternate Flows**:
- 2a. User provides invalid credentials and the system returns error messages.

### 3. Create Post
**Actor**: Authenticated User  
**Description**: An authenticated user creates a new blog post.

**Main Flow**:
1. Authenticated user accesses the create post page.
2. User fills out the form with the title, content, and post status (draft or published).
3. System validates the information and creates the post.
4. System redirects the user to the view of the new post.

**Alternate Flows**:
- 2a. User provides invalid information and the system returns error messages.

### 4. View Posts
**Actor**: Visitor/User  
**Description**: A visitor or user views a list of published posts or the details of a specific post.

**Main Flow**:
1. Visitor/User accesses the main blog page.
2. System displays a list of published posts.
3. Visitor/User clicks on a post to see more details.
4. System displays the full content of the selected post.

**Alternate Flows**: None.

### 5. Edit Post
**Actor**: Authenticated Author  
**Description**: An authenticated author edits one of their existing posts.

**Main Flow**:
1. Author accesses the edit post page.
2. Author modifies the title, content, or status of the post.
3. System validates the changes and updates the post.
4. System redirects the author to the view of the updated post.

**Alternate Flows**:
- 2a. Author provides invalid information and the system returns error messages.

### 6. Delete Post
**Actor**: Authenticated Author  
**Description**: An authenticated author deletes one of their existing posts.

**Main Flow**:
1. Author accesses the page of the post to be deleted.
2. Author clicks the delete button.
3. System confirms the action with the author.
4. System deletes the post and redirects the author to the list of posts.

**Alternate Flows**:
- 3a. Author cancels the delete action.

### 7. Add Comment
**Actor**: Authenticated User  
**Description**: An authenticated user adds a comment to a post.

**Main Flow**:
1. Authenticated user accesses the post page.
2. User fills out the comment form.
3. System validates the comment and adds it to the post.
4. System displays the new comment on the post page.

**Alternate Flows**:
- 2a. User provides invalid information and the system returns error messages.

## Estrutura do Projeto

- **Backend**: Django
- **Frontend**: React
- **Banco de Dados**: SQLite (pode ser atualizado para outro SGBD conforme necessidade)
- **Docker**: Docker e Docker Compose para containerização
- **Testes**: TDD (Desenvolvimento Orientado a Testes)

## Como Rodar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos

1. Ainda em analise

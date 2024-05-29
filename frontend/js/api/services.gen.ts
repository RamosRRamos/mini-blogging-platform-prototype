// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type {
  ApiCommentsListData,
  ApiCommentsListResponse,
  ApiCommentsCreateData,
  ApiCommentsCreateResponse,
  ApiCommentsRetrieveData,
  ApiCommentsRetrieveResponse,
  ApiCommentsUpdateData,
  ApiCommentsUpdateResponse,
  ApiCommentsPartialUpdateData,
  ApiCommentsPartialUpdateResponse,
  ApiCommentsDestroyData,
  ApiCommentsDestroyResponse,
  ApiPostsListData,
  ApiPostsListResponse,
  ApiPostsCreateData,
  ApiPostsCreateResponse,
  ApiPostsRetrieveData,
  ApiPostsRetrieveResponse,
  ApiPostsUpdateData,
  ApiPostsUpdateResponse,
  ApiPostsPartialUpdateData,
  ApiPostsPartialUpdateResponse,
  ApiPostsDestroyData,
  ApiPostsDestroyResponse,
  ApiRestRestCheckRetrieveResponse,
  ApiUsersListData,
  ApiUsersListResponse,
  ApiUsersCreateData,
  ApiUsersCreateResponse,
  ApiUsersRetrieveData,
  ApiUsersRetrieveResponse,
  ApiUsersUpdateData,
  ApiUsersUpdateResponse,
  ApiUsersPartialUpdateData,
  ApiUsersPartialUpdateResponse,
  ApiUsersDestroyData,
  ApiUsersDestroyResponse,
} from "./types.gen";

export class ApiService {
  /**
   * @param data The data for the request.
   * @param data.limit Number of results to return per page.
   * @param data.offset The initial index from which to return the results.
   * @returns PaginatedCommentList
   * @throws ApiError
   */
  public static apiCommentsList(
    data: ApiCommentsListData = {},
  ): CancelablePromise<ApiCommentsListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/comments/",
      query: {
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Comment
   * @throws ApiError
   */
  public static apiCommentsCreate(
    data: ApiCommentsCreateData,
  ): CancelablePromise<ApiCommentsCreateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comments/",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this comment.
   * @returns Comment
   * @throws ApiError
   */
  public static apiCommentsRetrieve(
    data: ApiCommentsRetrieveData,
  ): CancelablePromise<ApiCommentsRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/comments/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this comment.
   * @param data.requestBody
   * @returns Comment
   * @throws ApiError
   */
  public static apiCommentsUpdate(
    data: ApiCommentsUpdateData,
  ): CancelablePromise<ApiCommentsUpdateResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/comments/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this comment.
   * @param data.requestBody
   * @returns Comment
   * @throws ApiError
   */
  public static apiCommentsPartialUpdate(
    data: ApiCommentsPartialUpdateData,
  ): CancelablePromise<ApiCommentsPartialUpdateResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/comments/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this comment.
   * @returns void No response body
   * @throws ApiError
   */
  public static apiCommentsDestroy(
    data: ApiCommentsDestroyData,
  ): CancelablePromise<ApiCommentsDestroyResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/comments/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.limit Number of results to return per page.
   * @param data.offset The initial index from which to return the results.
   * @returns PaginatedPostList
   * @throws ApiError
   */
  public static apiPostsList(
    data: ApiPostsListData = {},
  ): CancelablePromise<ApiPostsListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/posts/",
      query: {
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Post
   * @throws ApiError
   */
  public static apiPostsCreate(
    data: ApiPostsCreateData,
  ): CancelablePromise<ApiPostsCreateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/posts/",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this post.
   * @returns Post
   * @throws ApiError
   */
  public static apiPostsRetrieve(
    data: ApiPostsRetrieveData,
  ): CancelablePromise<ApiPostsRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/posts/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this post.
   * @param data.requestBody
   * @returns Post
   * @throws ApiError
   */
  public static apiPostsUpdate(
    data: ApiPostsUpdateData,
  ): CancelablePromise<ApiPostsUpdateResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/posts/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this post.
   * @param data.requestBody
   * @returns Post
   * @throws ApiError
   */
  public static apiPostsPartialUpdate(
    data: ApiPostsPartialUpdateData,
  ): CancelablePromise<ApiPostsPartialUpdateResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/posts/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A UUID string identifying this post.
   * @returns void No response body
   * @throws ApiError
   */
  public static apiPostsDestroy(
    data: ApiPostsDestroyData,
  ): CancelablePromise<ApiPostsDestroyResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/posts/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * Check REST API
   * This endpoint checks if the REST API is working.
   * @returns Message
   * @throws ApiError
   */
  public static apiRestRestCheckRetrieve(): CancelablePromise<ApiRestRestCheckRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/rest/rest-check/",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.limit Number of results to return per page.
   * @param data.offset The initial index from which to return the results.
   * @returns PaginatedUserList
   * @throws ApiError
   */
  public static apiUsersList(
    data: ApiUsersListData = {},
  ): CancelablePromise<ApiUsersListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/users/",
      query: {
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersCreate(
    data: ApiUsersCreateData,
  ): CancelablePromise<ApiUsersCreateResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/users/",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @returns User
   * @throws ApiError
   */
  public static apiUsersRetrieve(
    data: ApiUsersRetrieveData,
  ): CancelablePromise<ApiUsersRetrieveResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersUpdate(
    data: ApiUsersUpdateData,
  ): CancelablePromise<ApiUsersUpdateResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @param data.requestBody
   * @returns User
   * @throws ApiError
   */
  public static apiUsersPartialUpdate(
    data: ApiUsersPartialUpdateData,
  ): CancelablePromise<ApiUsersPartialUpdateResponse> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.id A unique integer value identifying this user.
   * @returns void No response body
   * @throws ApiError
   */
  public static apiUsersDestroy(
    data: ApiUsersDestroyData,
  ): CancelablePromise<ApiUsersDestroyResponse> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/users/{id}/",
      path: {
        id: data.id,
      },
    });
  }
}

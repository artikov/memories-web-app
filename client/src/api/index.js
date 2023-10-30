import axios from "axios";

const API = axios.create({ baseURL: "" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		if (typeof JSON.parse(localStorage.getItem("profile")).token === "object") {
			req.headers.Authorization = `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token.id_token
			}`;
		} else {
			req.headers.Authorization = `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`;
		}
	}

	return req;
});

// const url = 'https://memories-artikov.herokuapp.com/posts'

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

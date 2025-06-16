import { useState, useEffect } from "react";
import PostService from "services/post-service";

const usePost = (idPost) => {
	const [post, setPost] = useState(null);

	useEffect(() => {
		PostService.getPost(idPost).then((response) => {
			setPost(response);
		});
	}, [idPost]);

	return post;
};

export default usePost;

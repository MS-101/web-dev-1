import { useState, useEffect } from "react";
import PostService from "services/post-service";

const usePost = (idPost) => {
	const [post, setPost] = useState(null);
	const [postLoaded, setPostLoaded] = useState(false);

	useEffect(() => {
		PostService.getPost(idPost).then((response) => {
			setPost(response);
		});
	}, [idPost]);

	return { post, postLoaded };
};

export default usePost;

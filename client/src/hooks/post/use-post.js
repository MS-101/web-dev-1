import { useState, useEffect } from "react";
import { useAuthContext } from "contexts/auth-context";
import PostService from "services/post-service";

const usePost = (idPost) => {
	const [post, setPost] = useState(null);
	const [postLoaded, setPostLoaded] = useState(false);

	const { authUser, getAccessToken } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			getAccessToken()
				.then((accessToken) => {
					return PostService.getPost(idPost, accessToken);
				})
				.then((response) => {
					setPost(response);
					setPostLoaded(true);
				});
		} else {
			PostService.getPost(idPost).then((response) => {
				setPost(response);
				setPostLoaded(true);
			});
		}
	}, [idPost, authUser]);

	return { post, postLoaded };
};

export default usePost;

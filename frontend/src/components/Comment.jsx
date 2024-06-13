import { useDispatch, useSelector } from "react-redux";
import { setComments, addComment } from "../redux/reducers/commentReducer";
import blogService from "../services/blogService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Comment = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const comments = useSelector((state) => state.comments);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await blogService.fetchComment(id);
                dispatch(setComments(fetchedComments));
            } catch (error) {
                console.error("Failed to fetch comments", error);
            }
        };
        fetchComments();
    }, [dispatch, id]);

    const handleNewComment = async (event) => {
        event.preventDefault();
        try {
            const commentObject = {
                content: newComment
            };
            const savedComment = await blogService.createComment(id, commentObject);
            dispatch(addComment(savedComment));
            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error('Error creating new comment', error);
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            <ul className="list-unstyled mt-3">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleNewComment}>
                <Form.Group>
                <Form.Control 
                    value={newComment}
                    type="text"
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                </Form.Group>
                <Button type="submit" variant="dark grey" className="container" id="comment_button">
                    Add comment
                </Button>
            </form>
        </div>
    );
};

export default Comment;

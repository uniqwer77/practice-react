import { type Comment } from '../../services/useServices';
import styles from './CommentItem.module.css';

interface CommentProps {
    data: Comment;
}

const CommentItem = ({data}: CommentProps) => {
    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                <strong className={styles.commentAuthor}>{data.author}</strong>
                <span className={styles.commentEmail}>{data.email}</span>
            </div>
            <p className={styles.commentBody}>
                {data.body}
            </p>
        </div>
    )
}

export default CommentItem;
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, isLiked, timePosted, backgroundColorClass} =
    commentDetails

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const timeAgo = formatDistanceToNow(new Date(timePosted))

  // Get the first letter of the name
  const initial = name[0].toUpperCase()

  // Toggle like button on click
  const onClickLike = () => {
    toggleLike(id)
  }

  // Delete comment on click
  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <>
      <li className="comment-item">
        <div className="comment-header">
          <div className={`profile-logo ${backgroundColorClass}`}>
            {initial}
          </div>
          <div className="comment-header-text">
            <p className="comment-name">{name}</p>
            <p className="comment-time">{timeAgo} ago</p>
          </div>
        </div>
        <p className="comment-text">{comment}</p>
        <div className="comment-footer">
          <button type="button" className="like-button" onClick={onClickLike}>
            <img src={likeImgUrl} alt="like" className="like-img" />
          </button>
          <button
            type="button"
            className="delete-button"
            data-testid="delete"
            onClick={onClickDelete}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-img"
            />
          </button>
        </div>
      </li>
      <hr className="horizontal-line" />
    </>
  )
}

export default CommentItem

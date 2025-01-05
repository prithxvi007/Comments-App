import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentList: [], name: '', comment: ''}

  // Handler for input change
  onChangeInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  // Form submission handler
  onSubmitForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name && comment !== '') {
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        isLiked: false, // Add isLiked field
        timePosted: new Date(), // Add time of posting
      }
      this.setState(prevState => ({
        commentList: [...prevState.commentList, newComment],
        name: '', // Reset name input
        comment: '', // Reset comment input
      }))
    }
  }

  // Toggle like status
  toggleLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  // Delete comment
  deleteComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(comment => comment.id !== id),
    }))
  }

  render() {
    const {commentList, name, comment} = this.state
    const commentCount = commentList.length
    return (
      <div className="comment-bg-container">
        <div className="comment-card-container">
          <div className="comment-content-container">
            <h1 className="comment-heading">Comments</h1>
            <p className="comment-description">
              Say something about 4.0 Technologies
            </p>
            <form onSubmit={this.onSubmitForm}>
              <input
                className="comment-input"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={this.onChangeInput}
              />
              <textarea
                rows="6"
                className="comment-textarea"
                placeholder="Your Comment"
                name="comment"
                value={comment}
                onChange={this.onChangeInput}
              ></textarea>
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <img
            className="comment-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="horizontal-line" />
        <p className="comment-count">
          <span>{commentCount}</span> Comments
        </p>
        <ul className="comments-list">
          {commentList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleLike={this.toggleLike}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaHeart, FaComment, FaStar, FaBookmark, FaClock } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const RecipeCard = ({id, title, image, chefName, chefImage, ingredients, instructions, url, moreInfoUrl, prepTime, servings, countryOfOrigin, ratings, dietType}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { userImage: 'https://img.freepik.com/free-photo/surprised-business-woman-portrait-smiling-face_53876-153512.jpg?t=st=1723163496~exp=1723167096~hmac=7def042c472c5d3e97419c0e5af3735aa14b30d53400ef7955c98425035004fa&w=740', userName: 'Alice', text: 'Great recipe!' },
    { userImage: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFmcmljYW4lMjBmYWNlfGVufDB8fDB8fHww', userName: 'Bob', text: 'I loved it!' },
    { userImage: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGFmcmljYW4lMjBmYWNlfGVufDB8fDB8fHww', userName: 'Charlie', text: 'Will try this soon!' },
  ]);

  const toggleLike = () => setLiked(!liked);
  const toggleBookmark = () => setBookmarked(!bookmarked);
  const toggleComment = () => setCommentOpen(!commentOpen);

  const handleRating = (value) => setRating(value);
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, {
        userImage: 'https://via.placeholder.com/50',
        userName: 'You',
        text: newComment.trim()
      }]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col h-full">
      {/* Recipe Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img src={chefImage} alt="Chef" className="w-12 h-12 rounded-full border border-gray-300" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-600">by <span className="font-semibold">{chefName}</span></p>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="mb-4">
        <img src={image} alt="Recipe" className="w-full h-40 object-cover rounded-lg" />
      </div>

      {/* Recipe Details */}
      <div className="mb-4 text-sm text-gray-700 space-y-2 flex-grow">
        <p><span className="font-semibold">Diet Type:</span> {dietType}  |  <span className="font-semibold"><FaClock className="inline" /> </span> {prepTime}</p>
        <p><span className="font-semibold">Servings:</span> {servings}  |  <span className="font-semibold">Country of Origin:</span> {countryOfOrigin}</p>
        <p><span className="font-semibold">Ingredients:</span> {ingredients}</p>
        <p><span className="font-semibold">Instructions:</span> {instructions}</p>

        <a href={moreInfoUrl} className="text-green-400 hover:text-customGreen text-xs block mt-2" target="_blank" rel="noopener noreferrer">
          View More Recipe Info
        </a>
      </div>

      {/* Likes, Ratings, Comments, and Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={toggleLike} className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
          <FaHeart className="text-xl" />
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => handleRating(star)}
            />
          ))}
          <span className="ml-2">{rating > 0 ? rating.toFixed(1) : rating.toFixed(1)}</span>
        </div>
        <button onClick={toggleComment} className="text-gray-500 hover:text-gray-700">
          <FaComment className="text-xl" />
        </button>
        <button
          onClick={toggleBookmark}
          className={`${bookmarked ? 'text-blue-500' : 'text-gray-500'} group relative`}
        >
          <FaBookmark className="text-xl" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {commentOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img src={comment.userImage} alt="User" className="w-10 h-10 rounded-full border border-gray-300" />
                <div>
                  <p className="font-semibold text-sm">{comment.userName}</p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <button
              onClick={handleSubmitComment}
              className="mt-2 px-4 py-2 bg-green-900 text-white rounded-lg text-sm hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Comment
            </button>
          </div>
        </div>
      )}

      {/* Social Media Share Buttons */}
      <div className="flex space-x-4 mt-4">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <FaFacebookF className="text-xl" />
        </a>

        <a href={`https://x.com/intent/tweet?url=${url}`} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
          <FaXTwitter className="text-xl" />
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaInstagram className="text-xl" />
        </a>

        <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this recipe: ${url}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <FaWhatsapp className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
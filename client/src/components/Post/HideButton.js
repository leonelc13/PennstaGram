import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addHiddenPost, removeHiddenPost } from '../../api/users';

function HideButton(props) {
  const { currentUser, id, setUser } = props;
  const navigate = useNavigate();

  const handleHideUnhide = async () => {
    // if the post is already hidden
    if (currentUser.hiddenPosts !== null && currentUser.hiddenPosts.includes(id)) {
      await removeHiddenPost(currentUser.username, id);
      setUser(currentUser);
      navigate('/');
    } else {
      try {
        await addHiddenPost(currentUser.username, id);
        navigate('/');
      } catch (err) {
        //   console.log(err);
      }
    }
  };

  if (currentUser.hiddenPosts !== null && currentUser.hiddenPosts.includes(id)) {
    return (
      <div className="hideButton">
        <button type="button" onClick={handleHideUnhide}> Unhide Post </button>
      </div>
    );
  }
  return (
    <div className="hideButton">
      <button type="button" onClick={handleHideUnhide}> Hide Post </button>
    </div>
  );
}

export default HideButton;

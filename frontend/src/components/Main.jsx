import React, {useState, useContext} from 'react';
import ImageHolder from './ImageHolder'
import SavedImageHolder from '../components/SavedImageHolder'
import CommentsHolder from './CommentsHolder'
import CommentContext from '../CommentsContext'
import { Redirect } from 'react-router-dom'
import UserContext from '../UserContext'

export default function MainWrapper(props){
  const imageData = props.location.imageData
  const [comments, setComments] = useState([])
  // const {user, userImages, setUserImages} = useContext(UserContext);

  return (
    <div className='max-w-screen-xl grid-cols-12 grid mx-auto gap-x-5 py-8 h-85'>
      <CommentContext.Provider value={{
        setComments,
        comments
      }} >
        <ImageHolder imageData={imageData} />
        <CommentsHolder />
      </CommentContext.Provider>
      {/*{user ? null : <Redirect push to="/" />}*/}
    </div>

  )
}
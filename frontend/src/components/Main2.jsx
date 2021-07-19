import React, {useState} from 'react';
import ImageHolder from './ImageHolder'
import SavedImageHolder from '../components/SavedImageHolder'
import CommentsHolder from './CommentsHolder'
import CommentContext from '../CommentsContext'

export default function MainWrapper2(props){
  const imageData = props.location.imageData
  const [comments, setComments] = useState([])


  return (
    <div className='max-w-screen-xl grid-cols-12 grid mx-auto gap-x-5 py-8 h-85'>
      <CommentContext.Provider value={{
        setComments,
        comments
      }} >
        {/*<ImageHolder imageData={imageData} />*/}
        <SavedImageHolder />
        <CommentsHolder />
      </CommentContext.Provider>
    </div>
  )
}
import React, {useContext} from 'react';
import Comment from './Comment'
import CommentContext from '../CommentsContext'

export default function CommentsHolder(){
  const {comments, setComments} = useContext(CommentContext);
  // console.log(comments)
  return (
    <div className="col-span-4 shadow-md rounded-xl border h-85 overflow-y-auto">
      <h2 className="text-2xl	p-5 mb-8">Comments</h2>
      {/*{comments}*/}
      {
        comments.map(item=>{
          return (
            // <div key={item.key}>{item.x}</div>
            <Comment key={item.key}  x={item.x} y={item.y} number={item.number} comment={item.description}/>
          )
        })
      }

    </div>
  )
}
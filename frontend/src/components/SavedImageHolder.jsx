import React ,{useState, useEffect, useContext, useRef, createContext} from 'react';
import image from '../image.jpg';
import CommentContext from '../CommentsContext'
import Button from './Button'
import Input from './Input'
import ImagePin from './ImagePin'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import UserContext from '../UserContext'

// Temporary variable for info
let temp = '';
const CommentModalStatus = createContext({})





function CommentModal({imageId}){
  let token = localStorage.getItem('imageauth')
  const url = "http://localhost:3001";
  const {comments, setComments} = useContext(CommentContext);
  const {modalStatus, setModalStatus} = useContext(CommentModalStatus);

  const pinComment = useRef('');

  async function addComment(){
    if (pinComment.current) {
      temp.comment = pinComment.current.value;
      setModalStatus(oldValue => !oldValue);
      let imageComment= {
        description: pinComment.current.value,
        xCord: temp.x,
        yCord: temp.y,
        number: temp.number,
        key: temp.key
      };

      setComments((oldValue)=> [...oldValue, imageComment]);


      let body = {
        // imageComment: JSON.stringify(imageComment),
        imageComment: imageComment,
        imageid: imageId
      }
      // console.log("BODY ",body)

      let response = await fetch(`${url}/addComment`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "imageauth": token
        },
        body: JSON.stringify(body)
      });
      let data = await response.json();
      // console.log(data);
    }
  }

  const addCommentToImage = async ()=>{
    // fetch()
  }

  function closeModal(){
    setModalStatus(oldValue => !oldValue);
  }

  return(
    <div className="absolute comment-modal p-6 bg-white	rounded-xl w-3/5 z-40">

      <input ref={pinComment} type="text" className="border-2 focus:border-blue-600 border-gray-400 rounded-xl p-2 block w-full mb-4" placeholder="Comment"/>
      {/*  WTF  ????*/}
      {/*try this: https://linguinecode.com/post/how-to-pass-parameter-values-to-onclick-react-function*/}
      <button className="text-xs py-1.5 px-4 rounded-lg font-medium border-2 text-red-500 hover:bg-gray-200 border-gray-200 mx-2" onClick={closeModal} >Cancel</button>
      <button className="text-xs py-1.5 px-4 rounded-lg font-medium border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 text-white" onClick={addComment}>Add comment</button>
    </div>
  )
}


export default function SaveImageHolder({imageData}){
  let imgUrl;
  let imgID;


  const url = "http://localhost:3001";
  const {comments,setComments} = useContext(CommentContext);
  const {userImages} = useContext(UserContext);
  const [modalStatus, setModalStatus] = useState(false)
  const [imageUrl, setImageUrl] = useState('');
  const [newImage, setNewImage] = useState('')


  let cord = {}

  const userDataRaw = localStorage.getItem('user')
  // const userData = JSON.parse(userDataRaw)
  // const token = localStorage.getItem('imageauth')
  // console.log(token)



  const {imageId} = useParams()
  console.log('ciaaa: ',imageId)
  // console.log(imageId)
  useEffect(()=>{

    if (imageId){
      let body = {
        imageId: imageId
      };
      (async ()=>{
        try{
          let response = await fetch(`${url}/getPublicImageById`,{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              // 'imageauth': token,
            },
            body:  JSON.stringify(body)
          })

          if(response.status !== 200) throw await response.json()

          let data = await response.json();
          console.log(data)
          setImageUrl( data.image)
          setComments(data.imageComments)
        } catch (e){
          alert(e)
          console.log(e)
        }
      })()
    } else {
    }
  },[imageUrl, imageId])

  return (
    <div className="col-span-8 relative">
      <div className="w-full relative" >
        <img className="w-full relative" src={imageUrl} alt="" />
        {/*Shows all pins*/}
        {comments.map(item=>{
          const {key, xCord, yCord, number} =item;
          return (
            <ImagePin key={key} x={xCord} y={yCord} number={number}/>
          )
        })}
      </div>

      <h1>{imageId}</h1>
      <h1>{imageUrl}</h1>

      {modalStatus ? <CommentModal /> : ''}
      <CommentModalStatus.Provider value={{
        modalStatus,
        setModalStatus,
        temp
      }}>
        {modalStatus ? <CommentModal imageId={imageId} /> : ''}
      </CommentModalStatus.Provider>
    </div>
  )
}
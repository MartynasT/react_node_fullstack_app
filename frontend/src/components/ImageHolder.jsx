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


export default function ImageHolder({imageData}){
  let imgUrl;
  let imgID;


  const url = "http://localhost:3001";
  const {comments,setComments} = useContext(CommentContext);
  const {userImages} = useContext(UserContext);
  const [modalStatus, setModalStatus] = useState(false)
  const [imageUrl, setImageUrl] = useState('');
  const [newImage, setNewImage] = useState('')
  const [publicLink, setPublicLink] = useState('')
  let cord = {}

  const userDataRaw = localStorage.getItem('user')
  const userData = JSON.parse(userDataRaw)
  const token = localStorage.getItem('imageauth')
  // console.log(token)

  function test(){
    // console.log('test')
    let fullUrl = window.location.href;
    // console.log(fullUrl)

  }

  const {imageId} = useParams()
  // console.log(imageId)
  useEffect(()=>{
    test();
    // console.log('useEffect')
    // setTimeout(()=>{
    //   let fullUrl = window.location.href;
    //
    //   console.log(fullUrl)
    //   console.log(antoherState)
    // },3000)
    if (imageId){
      let body = {
        imageId: imageId
      };
      (async ()=>{
        try{
          let response = await fetch(`${url}/getImageById`,{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'imageauth': token,
            },
            body:  JSON.stringify(body)
          })

          if(response.status !== 200) throw await response.json()

          let data = await response.json();
          // console.log('image data')
          // console.log(data)
          // console.log(data.image)
          // console.log(data._id)
          setImageUrl( data.image)
          setComments(data.imageComments)
          // console.log('IMAGE URL: ', imageUrl)
          // console.log(imageId)
        } catch (e){
          alert(e)
          console.log(e)
        }
      })()
    } else {
      // console.log('add new image')
    }
  },[imageUrl, imageId])

  // Creates image pin cord
  const ImageCoords = (e)=>{
    const element = e.target;
    let rect = element.getBoundingClientRect();
    let imageHeight = rect.height
    let imageWidth = rect.width
    let x = e.clientX - rect.left -16;
    let y = e.clientY - rect.top -16;
    let xPercentage = (x * 100) / imageWidth ;
    let yPercentage = (y * 100) / imageHeight;
    cord = {
      key: Math.random() *1000,
      x: xPercentage + '%',
      y: yPercentage + '%',
      number: comments.length + 1,
      comment: ''
    }
    temp = cord;
    // setComments((oldValue)=> [...oldValue, cord]);
    setModalStatus(oldValue => !oldValue);
  }

  function showImage(e){
    const [file] = e.target.files;
    const allowImageTypes = ['image/svg+xml','image/jpeg', 'image/png' ]
    if (file && allowImageTypes.includes(file.type)) {
      setImageUrl(URL.createObjectURL(file))
      addImage(file)
    }
  }

 async function addImage(file){
    const formData = new FormData()
    formData.append('image', file);

    try{
      let response = await fetch(`${url}/newImage`,{
        method: "POST",
        headers: {
          'imageauth': token,
        },
        body:formData
      })

      if(response.status !== 200) throw await response.json()


      let data = await response.json();
      // console.log('newImage: ', data)
      setNewImage(data._id)

    } catch (e){
      alert(e)
      // console.log(e)
    }
  }

  async function shareImage(){
    console.log('sharing')
    console.log(imageId)
    // imageId
    let body = {
      imageId: imageId
    };
    try{
      let response = await fetch(`${url}/publicPost`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'imageauth': token,
        },
        body:  JSON.stringify(body)
      })

      if(response.status !== 200) throw await response.json()
      let data = await response.json();

      console.log(data)
      setPublicLink(`localhost:3000/publicImage/${imageId}`)
      
    } catch (e){
      alert(e)
      console.log(e)
    }
  }

  return (
    <div className="col-span-8 relative">
      <div className="w-full relative" onClick={(e)=>ImageCoords(e)}>
        <img className="w-full relative" src={imageUrl} alt="" />
        {/*Shows fake pin while adding comment*/}
        {modalStatus ? <ImagePin key={temp.key} x={temp.x} y={temp.y} number={temp.number}/> : ''}
        {/*Shows all pins*/}
        {comments.map(item=>{
            const {key, xCord, yCord, number} =item;
            return (
              <ImagePin key={key} x={xCord} y={yCord} number={number}/>
            )
          })}
      </div>
      {imageUrl === '' ? <>
        <label htmlFor="upload-photo" className="text-xl py-2.5 px-7 rounded-2xl font-semibold border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 text-white mx-2 uppercase transition-colors duration-300">
          Upload image
        </label>
        <input type="file" name="photo" id="upload-photo" onChange={(e)=>showImage(e)} type="file"  />
        </>
        : ''
      }

      {/*{newImage  ? <NavLink  to={{*/}
      {/*  pathname:`/images/${newImage}`,*/}
      {/*  imageData:{*/}
      {/*    id: newImage._id,*/}
      {/*    imgUrl: newImage.image*/}
      {/*  }*/}
      {/*}} /> : null}*/}


      {newImage ? <Redirect push to={{
        pathname:`/images/${newImage}`,
        imageData:{
          id: newImage._id,
          imgUrl: newImage.image
        }
      }} /> : null}

      <h1>{imageId}</h1>
      <h1>{imageUrl}</h1>

      {publicLink ? <h2 >{publicLink}</h2> : null}


      <button className="py-2.5 px-7 rounded-2xl font-semibold border-2 border-blue-600" onClick={shareImage}>Share Image</button>

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
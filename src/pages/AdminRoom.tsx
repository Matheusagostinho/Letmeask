import {useHistory, useParams} from "react-router-dom"
import logoImg from '../assets/images/logo.svg'
import deleteImg from "../assets/images/delete.svg"
import deleteRedImg from "../assets/images/deleteRed.svg"
import closeRedImg from "../assets/images/closeRed.svg"
import {Button} from "../components/Button"
import {RoomCode} from "../components/RoomCode"
import "../styles/room.scss"
import {ModalDelete} from "../components/ModalDelete"
import { database } from "../services/firebase"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"


import { RefObject, useRef, useState } from "react"




type RoomParams = {
  id:string;
}

export function AdminRoom(){
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { title, questions} = useRoom(roomId)
  const [isOpen, setIsOpen] =useState(false)
  const [isOpenRoom, setIsOpenRoom] =useState(false)
  const [idQuestion, setIdQuestion] = useState('')
  const onClose = () => setIsOpen(false)
  const onCloseRoom = () => setIsOpenRoom(false)
  const cancelRef = useRef() as RefObject<HTMLButtonElement> | undefined
  const cancelRefRoom = useRef() as RefObject<HTMLButtonElement> | undefined

async function handleEndRoom() {
  setIsOpenRoom(true)
}

async function confirmDeleteRoom() {
  await  database.ref(`rooms/${roomId}`).update({
    endedAt: new Date()
  })

  history.push("/")
  
}

async function confirmDeleteQuestion(){
  await  database.ref(`rooms/${roomId}/questions/${idQuestion}`).remove()
    onClose()
    setIdQuestion('')
}
  function handleDeleteQuestion(questionId: string) {
    setIsOpen(true)
    setIdQuestion(questionId)
    
  }




  
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk"/>
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}> Encerar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
         {questions.length > 0 &&  <span> {questions.length} Perguntas</span>}
        </div>
        <div className="question-list">
        {questions.map(question => {
          return(
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button onClick={()=> handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Deletar pergunta"></img>
              </button>
            </Question>
          )
        })}
        </div>
      </main>
      <ModalDelete 
        isOpen={isOpen} 
        cancelRef={cancelRef} 
        onClose={onClose}  
        deleteRedImg={deleteRedImg} 
        confirmDeleteQuestion={confirmDeleteQuestion}
        title="Excluir Pergunta"
        text="Tem certeza que você deseja excluir esta pergunta?"
      />

      <ModalDelete 
        isOpen={isOpenRoom} 
        cancelRef={cancelRefRoom} 
        onClose={onCloseRoom}  
        deleteRedImg={closeRedImg} 
        confirmDeleteQuestion={confirmDeleteRoom}
        title="Excluir Sala"
        text="Tem certeza que você deseja excluir esta sala?"
      />
    </div>
      
    )
}
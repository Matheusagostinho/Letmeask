import { useHistory, useParams } from 'react-router-dom'

import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import deleteRedImg from '../../assets/images/deleteRed.svg'
import closeRedImg from '../../assets/images/closeRed.svg'
import circleImg from '../../assets/images/circle.svg'
import '../../styles/room.scss'
import { ModalDelete } from '../../components/ModalDelete/'
import { database } from '../../services/firebase'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'
import { RefObject, useRef, useState } from 'react'
import { Header } from '../../components/Header'

type RoomParams = {
  id:string;
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { title, questions } = useRoom(roomId)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenRoom, setIsOpenRoom] = useState(false)
  const [idQuestion, setIdQuestion] = useState('')
  const onClose = () => setIsOpen(false)
  const onCloseRoom = () => setIsOpenRoom(false)
  const cancelRef = useRef() as RefObject<HTMLButtonElement> | undefined
  const cancelRefRoom = useRef() as RefObject<HTMLButtonElement> | undefined

  async function handleEndRoom() {
    setIsOpenRoom(true)
  }

  async function confirmDeleteRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function confirmDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${idQuestion}`).remove()
    onClose()
    setIdQuestion('')
  }
  function handleDeleteQuestion(questionId: string) {
    setIsOpen(true)
    setIdQuestion(questionId)
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id="page-room">
      <Header handleEndRoom={handleEndRoom} roomId={roomId}/>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
         {questions.length > 0 && <div> {questions.length} <p>Perguntas</p></div>}
        </div>
        <div className="question-list">
        {questions.map(question => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
               {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
               )}
              <button onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Deletar pergunta"></img>
              </button>
            </Question>
          )
        })}
          {questions.length === 0 &&
            <div className="empty-questions">
              <img src={circleImg} alt="Mensagens"/>
              <h1>Nenhuma pergunta por aqui...</h1>
              <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
            </div>
          }
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

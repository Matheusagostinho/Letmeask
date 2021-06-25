import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import logoWhiteImg from '../../assets/images/logoWhite.svg'
import '../../styles/auth.scss'
import '../../styles/button.scss'
import { Button } from '../../components/Button'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router'
import { useColorMode, SlideFade } from '@chakra-ui/react'
export function NewRoom() {
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')
  const history = useHistory()
  const { colorMode } = useColorMode()

  async function handleCreateRoom(event:FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({

      title: newRoom,
      authorId: user?.id
    })
    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }
  return (
    <div id="page-auth">
      <aside>
        <SlideFade in={true} offsetY="-20px">
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
          <strong>Crie salas de Q&amp;A ao-vivo.</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </SlideFade>
      </aside>
      <main>
        <SlideFade in={true} offsetY="20px" className="main-content">
          <img src={colorMode === 'light' ? logoImg : logoWhiteImg} alt="Letmeask" />
          <h2> Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
              className={colorMode}
            />
            <Button type="submit" className="button">
              Criar Sala
            </Button>
          </form>
          <p> Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link></p>
        </SlideFade>
      </main>
    </div>
  )
}

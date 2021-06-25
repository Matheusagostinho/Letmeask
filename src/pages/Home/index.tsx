import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'
import { SlideFade, useToast } from '@chakra-ui/react'
import { FiLogIn } from 'react-icons/fi'
import '../../styles/auth.scss'
import '../../styles/button.scss'
import { Button } from '../../components/Button'
import { useHistory } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../../services/firebase'

export function Home () {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')
  const toast = useToast()

  async function handleCreateRoom () {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom (event:FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      toast({
        title: 'Erro ao entrar.',
        description: 'Código errado ou sala não existe',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    if (!roomRef.val().endAt) {
      toast({
        title: 'Erro ao entrar.',
        description: 'Sala já Finalizada',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
    <aside>
      <SlideFade in={true} offsetY="20px">
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo.</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </SlideFade>
      </aside>
      <main>
        <SlideFade in={true} offsetY="-20px" className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <div className="title-smartphone">
            <strong>Crie salas de Q&amp;A ao-vivo.</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
          </div>
          {user
            ? (<button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google" />
            Continuar como {user.name}
          </button>)
            : (
              <button className="create-room" onClick={handleCreateRoom}>
                <img src={googleIconImg} alt="Google" />
                Crie sua sala com o Google
              </button>
              )}

          <div className="separator"> ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => { setRoomCode(event.target.value) }}
              value={roomCode}
            />
            <Button type="submit" className="button">
              <FiLogIn />
              Entrar na sala
            </Button>
          </form>
        </SlideFade>
      </main>
    </div>
  )
}

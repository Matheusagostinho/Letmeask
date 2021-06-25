import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button as ButtonC,
  Image

} from '@chakra-ui/react'
import { RefObject } from 'react'

type ModalProps={
  isOpen: boolean
  cancelRef: RefObject<HTMLButtonElement> | undefined
  onClose: () => void
  deleteRedImg: string
   confirmDeleteQuestion: () => void
   title:string
   text:string
}

export function ModalDelete ({ isOpen, cancelRef, onClose, deleteRedImg, confirmDeleteQuestion, title, text }:ModalProps) {
  return (

    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    size="xl"

  >
<AlertDialogOverlay>
  <AlertDialogContent >
    <AlertDialogHeader as="div" marginTop="60px" alignItems="center" textAlign="center" fontSize="3xl" fontWeight="bold" className="alert">
      <Image src={deleteRedImg} alt="Deletar pergunta" marginX="auto" marginBottom="16px"/>
        <h2>{title}</h2>
    </AlertDialogHeader>

    <AlertDialogBody textAlign="center" color="#737380">
      {text}
    </AlertDialogBody>

    <AlertDialogFooter marginBottom="60px" justifyContent="center" >
      <ButtonC ref={cancelRef} onClick={onClose} paddingY="20px" paddingX="35px" fontSize="xl">
        Cancelar
      </ButtonC>
      <ButtonC colorScheme="red" onClick={confirmDeleteQuestion} ml={3} paddingY="20px" paddingX="35px" fontSize="xl">
        Sim, excluir
      </ButtonC>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>
  )
}

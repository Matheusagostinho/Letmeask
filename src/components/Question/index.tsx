import { ReactNode } from 'react'
import { SlideFade } from '@chakra-ui/react'
import cx from 'classnames'
import avatarImg from '../../assets/images/avatar.svg'
import './styles.scss'
type QuestionProps={
  content: string;
  author:{
    name:string;
    avatar:string;
  }
  children?: ReactNode;
  isHighlighted?:boolean;
  isAnswered?:boolean
}

export function Question({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false
}: QuestionProps) {
  return (
    <SlideFade in={true} offsetY="20px"
    className={cx(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered }
    )}>
       <p>{content}</p>
      <footer>
      <div className="user-info">
       <img src={author.avatar} alt={author.name}/>
        <span>{author.name}</span>
      </div>
      <div>{children}</div>
      </footer>
    </SlideFade>
  )
}

import React, {useContext} from 'react'
import {FirebaseContext} from '../context/firebase/fireBaseContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {AlertContext} from '../context/alert/alertContext'

export const Notes = ({notes}) => {
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)
  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map(note =>
        <CSSTransition
          key={note.id}
          classNames={'note'}
          timeout={600}
        >
          <li
            className="list-group-item note"
            
          >
            <div>
              <strong>{note.title}</strong>
              <small>{note.date}</small>
             </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                firebase.removeNote(note.id)
                  .then(() => alert.show('Заметка была удалена', 'success'),
                    () => alert.show('Ошибка при удалении', 'danger'))
              }}
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

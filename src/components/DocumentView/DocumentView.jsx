import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DocumentItem = ({ document, closeDocument }) => {
  const [isOpen, setModalOpen] = useState(true)
  const onToggleModal = () => {
    setModalOpen(false)
  }
  return (
    <div className="container">
      <Modal isOpen={isOpen} backdrop toggle={onToggleModal} onClosed={closeDocument}>
        <ModalHeader toggle={onToggleModal}>{document.content.title}</ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{ __html: document.content.content }} />
          <img src={document.content.thumbnail} width="100%" />
        </ModalBody>
        <ModalFooter>
          <div className="social-media-icons">
            <a href={document.content.url} target="_blank" className="m-1">
              <FontAwesomeIcon icon={['fas', 'globe']} />
            </a>
            <a href={document.content.twitter} target="_blank" className="m-1">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
            <a href={document.content.facebook} target="_blank" className="m-1">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </a>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DocumentItem

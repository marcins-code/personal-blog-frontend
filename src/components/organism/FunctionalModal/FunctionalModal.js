/* eslint-disable react/no-danger */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageContext, AuthContext } from 'context';
import Modal from 'components/molecules/Modal/Modal';
import { commonPhrazes } from 'languages/commonPhrazes';
import Spinner from 'components/atoms/Spinner/Spinner';

const FunctionalModal = ({
  modalShow,
  modalType,
  previewElement,
  resetFunc,
  elemetId,
  returnDeletedId,
  recordTitile,
}) => {
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalHeaderIcon, setModalHeaderIcon] = useState(['fas', 'bars']);
  const [modalContent, setModalContent] = useState('');
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const resetData = () => {
    resetFunc(null);
  };
  useEffect(() => {
    const regHeaders = new Headers();
    regHeaders.append('Content-Type', 'application/json');
    if (modalType === 'preview') {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}/article-type/${elemetId}`, {
            method: 'GET',
            headers: regHeaders,
          });
          const responseData = await response.json();
          const description = (
            <div dangerouslySetInnerHTML={{ __html: responseData.description[lang] }} />
          );
          setModalHeader(responseData.name);
          setModalHeaderIcon(responseData.icon.split(' '));
          setModalContent(description);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          if (response.ok) {
            setError(null);
          } else {
            setError(responseData);
            console.log(error);
          }
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    }

    if (modalType === 'delete' && confirmDelete) {
      regHeaders.append('Authorization', `Bearer ${auth.token}`);
      const fetchData = async () => {
        try {
          const response = await fetch(`${baseUrl}/article-type/${elemetId}`, {
            method: 'DELETE',
            headers: regHeaders,
          });
          const responseData = await response.json();
          if (response.ok) {
            returnDeletedId(responseData.id);
            setError(null);
          } else {
            setError(responseData);
          }
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
      resetFunc(false);
      setConfirmDelete(false);
    }

    // return (setModalHeader(); setModalHeaderIcon(); setModalContent());
  }, [elemetId, modalType, lang, confirmDelete]);

  return modalType === 'preview' ? (
    <Modal
      modalShow={modalShow}
      modalHeader={modalHeader}
      buttonClose
      resetFunc={resetData}
      modalHeaderIcon={modalHeaderIcon}
    >
      {isLoading && <Spinner text={commonPhrazes[lang].loading} />}
      {!isLoading && modalContent}
    </Modal>
  ) : (
    <Modal
      modalHeader={commonPhrazes[lang].confirm}
      modalHeaderIcon={['fas', 'exclamation'] || []}
      modalShow={modalShow}
      modalSmall
      noBackdropClose
      buttonConfirmDanger
      buttonConfirmDangerLabel={commonPhrazes[lang].delete}
      buttonConfirmDangerLabelIcon={['far', 'trash-alt']}
      confirmDangerFunc={() => setConfirmDelete(true)}
      resetFunc={resetFunc}
    >
      <h6>{commonPhrazes[lang].confirmDeletion}</h6>
      <br />
      <p style={{ fontWeight: 'normal' }}>
        <span>
          {commonPhrazes[lang].name}
          {': '}
        </span>
        <strong>{recordTitile}</strong>
      </p>
    </Modal>
  );
};

FunctionalModal.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(['preview', 'delete']).isRequired,
  previewElement: PropTypes.string,
  resetFunc: PropTypes.func.isRequired,
  returnDeletedId: PropTypes.func,
  elemetId: PropTypes.string.isRequired,
  recordTitile: PropTypes.string,
};

FunctionalModal.defaultProps = {
  previewElement: undefined,
  returnDeletedId: undefined,
  recordTitile: undefined,
};

export default FunctionalModal;

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'components/molecules/Modal/Modal';
import { commonPhrazes } from 'languages/commonPhrazes';
import { PageContext, AuthContext } from 'context';

const DeleteModal = ({
  dltModalTrigger,
  dltMdlContent,
  dltMdlResetFunc,
  dltMdlIdtoDelete,
  dltMdlConfirmDelete,
  dltModalDeleteApi,
}) => {
  const auth = useContext(AuthContext);
  const { lang } = useContext(PageContext);
  const [confirmDelete, setConfirmDelete] = useState(false);

  //   dltModalConfirmDeletion
  console.log(dltMdlIdtoDelete);

  useEffect(() => {
    if (confirmDelete) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      };
      confirmDelete
        && axios
          .delete(`${dltModalDeleteApi}/${dltMdlIdtoDelete}`, { headers })
          .then((response) => {
            toast.success(commonPhrazes[lang].deletionSuccess, { autoClose: 3500 });
            console.log(response);
            dltMdlResetFunc();
            dltMdlConfirmDelete(response.data._id);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
    }
  }, [confirmDelete, lang]);

  return (
    <Modal
      mdlShow={dltModalTrigger}
      resetFunc={dltMdlResetFunc}
      mdlSmall
      buttonConfirmDanger
      buttonConfirmDangerLabelIcon={['far', 'trash-alt']}
      mdlHeader={commonPhrazes[lang].confirmDelete}
      noBackdropClose
      mdlHeaderIcon={['fas', 'exclamation']}
      confirmDangerFunc={() => setConfirmDelete(true)}
      dltMdlConfirmDelete
    >
      {dltMdlContent}
    </Modal>
  );
};

DeleteModal.propTypes = {
  dltModalTrigger: PropTypes.bool,
  dltMdlContent: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.bool]),
  dltMdlResetFunc: PropTypes.func.isRequired,
  dltMdlConfirmDelete: PropTypes.func.isRequired,
  dltMdlIdtoDelete: PropTypes.string,
  dltModalDeleteApi: PropTypes.string,
};

DeleteModal.defaultProps = {
  dltModalTrigger: false,
  dltMdlContent: undefined,
  dltMdlIdtoDelete: '',
  dltModalDeleteApi: '',
};

export default DeleteModal;

import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageContext, AuthContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import { device } from 'themes/commonElements/mediaBreakpoints';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import Button from 'components/atoms/Button/Button';
import Spinner from 'components/atoms/Spinner/Spinner';
import Table from 'components/molecules/Table/Table';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import Modal from 'components/molecules/Modal/Modal';

const StyledSubheader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin: 20px 0;
`;

const StyledButtonsCell = styled.td`
  display: flex;
  flex-direction: row;
  justify-content: center;
  > button,
  a {
    margin-right: 15px;
  }
`;

const StyledOnlyBigScreenCell = styled.td`
  @media ${device.max.tablet} {
    display: none;
  }
`;

const AdminGlossary = (props) => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);

  const TableHeader = [
    { id: 1, title: glossaryPagePhrazes[lang].abbr },
    { id: 3, title: commonPhrazes[lang].published },
    { id: 4, title: commonPhrazes[lang].icon },
    { id: 5, title: glossaryPagePhrazes[lang].author },
    { id: 6, title: commonPhrazes[lang].createdAt },
    { id: 8, title: '' },
  ];

  // Getting data for table
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    axios.get('glossary/').then((response) => {
      setFetchedData(response.data);
    });
  }, []);

  // Hadle prewiev modal
  const [showPreview, setShowPreview] = useState(false);
  const [clickedRecordID, setClickedRecordID] = useState('');
  const [clickedRecordName, setClickedRecordName] = useState();
  const [modalHeader, setModalHeader] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const getRecordID = useCallback(
    (e) => {
      setClickedRecordID(e.target.closest('tr').id);
    },
    [clickedRecordID],
  );
  const getRecordName = useCallback(
    (e) => {
      setClickedRecordName(e.target.closest('tr').dataset.name);
    },
    [clickedRecordName],
  );

  const previewModalHandler = useCallback(
    (e) => {
      getRecordName(e);
      getRecordID(e);
      setShowPreview(true);
    },
    [showPreview],
  );
  const resetModalHandler = useCallback(
    (e) => {
      setClickedRecordID();
      setShowPreview(false);
      setTimeout(() => {
        setModalHeader();
        setModalContent();
      }, 500);
    },
    [showPreview],
  );

  useEffect(() => {
    showPreview
      && axios.get(`glossary/${clickedRecordID}`).then((response) => {
        setModalHeader(clickedRecordName);
        setModalContent(!response.data.description ? '' : parse(response.data.description[lang]));
      });
  }, [showPreview, lang]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deletewModalHandler = useCallback(
    (e) => {
      getRecordName(e);
      getRecordID(e);
      setShowDeleteModal(true);
    },
    [showDeleteModal],
  );

  useEffect(() => {
    setModalContent(
      parse(`<br />${commonPhrazes[lang].confirmDeletion} <strong>${clickedRecordName}</strong>`),
    );
  }, [showDeleteModal, lang]);

  const deleteConfiramtionHandler = useCallback(
    (e) => {
      setConfirmDelete(true);
      setShowDeleteModal(false);
    },
    [confirmDelete],
  );

  useEffect(() => {
    if (confirmDelete) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      };
      confirmDelete
        && axios
          .delete(`glossary/${clickedRecordID}`, { headers })
          .then((response) => {
            if (response.status === 200) {
              setFetchedData(
                fetchedData && fetchedData.filter((item) => item._id !== clickedRecordID),
              );
              setConfirmDelete(false);
              toast.success(commonPhrazes[lang].deletionSuccess, { autoClose: 3500 });
              setConfirmDelete(false);
              setClickedRecordID();
              setClickedRecordName();
              setModalContent();
            }
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
    <MainTemplate>
      <Modal
        mdlShow={showPreview}
        buttonClose
        resetFunc={resetModalHandler}
        mdlHeader={modalHeader}
        mdlHeaderIcon={['far', 'eye']}
      >
        {!modalContent ? <p>Pobierane</p> : modalContent}
      </Modal>
      <Modal
        mdlShow={showDeleteModal}
        buttonConfirmDanger
        mdlSmall
        noBackdropClose
        resetFunc={() => setShowDeleteModal(false)}
        mdlHeader={commonPhrazes[lang].confirm}
        mdlHeaderIcon={['fas', 'exclamation']}
        buttonConfirmDangerLabelIcon={['far', 'trash-alt']}
        confirmDangerFunc={deleteConfiramtionHandler}
      >
        {modalContent}
      </Modal>
      <AdminPageWrapper>
        <PageHeader title={glossaryPagePhrazes[lang].title} icon={['fas', 'sort-alpha-down']} />
        <StyledSubheader>
          <p>
            {`${commonPhrazes[lang].founded} `}
            {fetchedData && fetchedData.length}
            {` ${commonPhrazes[lang].records}`}
          </p>
          <Button type="button" btnColor="green" btnClick={() => push('/admin/manage-glossary')}>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} fixedWidth transform="left-2" />
            {glossaryPagePhrazes[lang].newEntry}
          </Button>
        </StyledSubheader>
        {!fetchedData && <Spinner text={commonPhrazes[lang].loading} />}
        {fetchedData && fetchedData.length === 0 && <p>No entries yet</p>}
        {fetchedData && fetchedData.length > 0 && (
          <Table headerItems={TableHeader} className="fadeIn" tblHover tblStripped tblColor="blue">
            {fetchedData.map((item) => (
              <tr key={item._id} id={item._id} data-name={item.abbreviation}>
                <td>{item.abbreviation}</td>
                <td>
                  <FontAwesomeIcon
                    icon={item.isEnabled ? ['far', 'check-circle'] : ['far', 'times-circle']}
                    size="lg"
                    style={item.isEnabled ? { color: 'green' } : { color: '#a42733' }}
                  />
                </td>
                <td>
                  {item.icon && item.icon.length > 0 && (
                    <FontAwesomeIcon icon={item.icon.split(' ')} size="lg" fixedWidth />
                  )}
                </td>
                <StyledOnlyBigScreenCell>{`${item.creator.firstName} ${item.creator.lastName}`}</StyledOnlyBigScreenCell>
                <StyledOnlyBigScreenCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </StyledOnlyBigScreenCell>
                <StyledButtonsCell>
                  <Button
                    type="button"
                    btnColor="indygo"
                    btnClick={() => push(`/admin/manage-glossary/${item._id}`)}
                  >
                    <FontAwesomeIcon icon={['fas', 'pen-nib']} fixedWidth />
                  </Button>
                  <Button type="button" btnColor="green" btnClick={previewModalHandler}>
                    <FontAwesomeIcon icon={['far', 'eye']} fixedWidth />
                  </Button>

                  <Button type="button" btnColor="red" btnClick={deletewModalHandler}>
                    <FontAwesomeIcon icon={['far', 'trash-alt']} fixedWidth />
                  </Button>
                </StyledButtonsCell>
              </tr>
            ))}
          </Table>
        )}
      </AdminPageWrapper>
    </MainTemplate>
  );
};

AdminGlossary.propTypes = {};

export default AdminGlossary;

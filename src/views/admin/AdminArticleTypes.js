import React, {
  useContext, useState, useCallback, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { PageContext, AuthContext } from 'context';
import { articleTypesPagePhrazes } from 'languages/articleTypesPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import Button from 'components/atoms/Button/Button';
import Spinner from 'components/atoms/Spinner/Spinner';
import Modal from 'components/molecules/Modal/Modal';
import Table from 'components/molecules/Table/Table';

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

const AdminArticleTypes = () => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const tableHeader = [
    { id: 1, title: articleTypesPagePhrazes[lang].name },
    { id: 3, title: articleTypesPagePhrazes[lang].type },
    { id: 5, title: articleTypesPagePhrazes[lang].icon },
    { id: 2, title: commonPhrazes[lang].published },
    { id: 4, title: articleTypesPagePhrazes[lang].author },
    { id: 6, title: commonPhrazes[lang].createdAt },
    { id: 8, title: '' },
  ];

  // // initial request to db
  const [fetchedData, setFetchedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/article-type')
      .then((respose) => {
        setFetchedData(respose.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  // preparation record for modals
  // get record id
  const [clickedRecordID, setClickedRecordID] = useState('');
  const getRecordID = useCallback(
    (e) => {
      setClickedRecordID(e.target.closest('tr').id);
    },
    [clickedRecordID],
  );
  // get record name
  const [clickedRecordName, setClickedRecordName] = useState();
  const getRecordName = useCallback(
    (e) => {
      setClickedRecordName(e.target.closest('tr').dataset.name);
    },
    [clickedRecordName],
  );

  // ------------Preview Modal---------------------------
  // manage modal prewiev visibilty and data
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const showPreviewModalHandler = useCallback(
    (e) => {
      getRecordID(e);
      getRecordName(e);
      setShowPreviewModal(true);
    },
    [setShowPreviewModal],
  );

  // reset modal prewiev visibilty and data
  const resetPreviewModalHandler = useCallback(() => {
    setClickedRecordID();
    setTimeout(() => {
      setClickedRecordName();
      setModalContent();
    }, 500);
    setShowPreviewModal(false);
  });

  // get data and set modal content
  const [modalContent, setModalContent] = useState(false);
  useEffect(() => {
    if (showPreviewModal) {
      axios
        .get(`/article-type/${clickedRecordID}`)
        .then((response) => {
          setModalContent(parse(response.data.description[lang]));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [showPreviewModal, setModalContent, lang]);

  // ------------Delete Modal---------------------------
  // manage modal prewiev visibilty and data
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showDeleteModalHandler = useCallback(
    (e) => {
      getRecordID(e);
      getRecordName(e);
      setShowDeleteModal(true);
    },
    [setShowDeleteModal],
  );

  // reset modal delete visibilty and data
  const resetDeleteModalHandler = useCallback(() => {
    setClickedRecordID();
    setClickedRecordName();
    setModalContent();
    setShowDeleteModal(false);
  });

  // add delete modal content
  useEffect(() => {
    setModalContent(
      parse(`<br />${commonPhrazes[lang].confirmDeletion} <strong>${clickedRecordName}</strong>`),
    );
  }, [showDeleteModal, lang]);

  // confirmation deletion
  const [confirmDelete, setConfirmDelete] = useState(false);
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
      axios.delete(`/article-type/${clickedRecordID}`, { headers }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          setFetchedData(
            fetchedData && fetchedData.filter((item) => item._id !== response.data.id),
          );
          toast.success(commonPhrazes[lang].deletionSuccess, { autoClose: 3500 });
          setConfirmDelete(false);
          setClickedRecordID();
          setClickedRecordName();
          setModalContent();
        }
      });
    }
  }, [confirmDelete]);

  return (
    <MainTemplate>
      <Modal
        mdlShow={showPreviewModal}
        buttonClose
        resetFunc={resetPreviewModalHandler}
        mdlHeader={clickedRecordName}
        mdlHeaderIcon={['far', 'eye']}
      >
        {!modalContent ? <Spinner text={commonPhrazes[lang].loading} /> : modalContent}
      </Modal>
      <Modal
        mdlShow={showDeleteModal}
        buttonConfirmDanger
        mdlSmall
        noBackdropClose
        resetFunc={resetDeleteModalHandler}
        mdlHeader={commonPhrazes[lang].confirm}
        mdlHeaderIcon={['fas', 'exclamation']}
        buttonConfirmDangerLabelIcon={['far', 'trash-alt']}
        confirmDangerFunc={deleteConfiramtionHandler}
      >
        {modalContent}
      </Modal>
      <AdminPageWrapper>
        <PageHeader title={articleTypesPagePhrazes[lang].title} icon={['fas', 'stream']} />
        <StyledSubheader>
          <p>
            {`${commonPhrazes[lang].founded} `}
            {fetchedData && fetchedData.length}
            {` ${commonPhrazes[lang].records}`}
          </p>
          <Button
            type="button"
            btnColor="green"
            btnClick={() => push('/admin/manage-article-type')}
          >
            <FontAwesomeIcon icon={['fas', 'plus-circle']} fixedWidth transform="left-2" />
            {' '}
            {articleTypesPagePhrazes[lang].newType}
          </Button>
        </StyledSubheader>
        {isLoading && <Spinner text={commonPhrazes[lang].loading} />}
        {fetchedData && fetchedData.length === 0 && <p>No entries yet</p>}
        {fetchedData && fetchedData.length > 0 && (
          <Table headerItems={tableHeader} className="fadeIn" tblHover tblStripped tblColor="blue">
            {fetchedData.map((item) => (
              <tr key={item._id} id={item._id} data-name={item.name}>
                <td>{item.name}</td>
                <td>
                  {item.type === 'serie' ? commonPhrazes[lang].serie : commonPhrazes[lang].category}
                </td>
                <td>
                  {item.icon && item.icon.length > 0 && (
                    <FontAwesomeIcon icon={item.icon.split(' ')} size="lg" fixedWidth />
                  )}
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={item.isEnabled ? ['far', 'check-circle'] : ['far', 'times-circle']}
                    size="lg"
                    style={item.isEnabled ? { color: 'green' } : { color: '#a42733' }}
                  />
                </td>
                <td>{`${item.creator.firstName} ${item.creator.lastName}`}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <StyledButtonsCell>
                  <Button
                    type="button"
                    btnColor="indygo"
                    btnClick={() => push(`/admin/manage-article-type/${item._id}`)}
                  >
                    <FontAwesomeIcon icon={['fas', 'pen-nib']} fixedWidth />
                  </Button>
                  <Button type="button" btnColor="green" btnClick={showPreviewModalHandler}>
                    <FontAwesomeIcon icon={['far', 'eye']} fixedWidth />
                  </Button>

                  <Button type="button" btnColor="red" btnClick={showDeleteModalHandler}>
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

export default AdminArticleTypes;

import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import parse from 'html-react-parser';
import { device } from 'themes/commonElements/mediaBreakpoints';
import { PageContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { commonPhrazes } from 'languages/commonPhrazes';
import { articlePagePhrazes } from 'languages/articlePagePhrazes';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import MainTemplate from 'templates/MainTemplate';
import Button from 'components/atoms/Button/Button';
import Spinner from 'components/atoms/Spinner/Spinner';
import Table from 'components/molecules/Table/Table';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';
import DeleteModal from 'components/organism/Modals/DeleteModal';

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

const AdminArticles = () => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);

  const TableHeader = [
    { id: 1, title: articlePagePhrazes[lang].articleTitle },
    { id: 2, title: articlePagePhrazes[lang].type },
    { id: 3, title: articlePagePhrazes[lang].seriePart },
    { id: 4, title: articlePagePhrazes[lang].categorySerie },
    { id: 5, title: commonPhrazes[lang].published },
    { id: 6, title: articlePagePhrazes[lang].author },
    { id: 7, title: commonPhrazes[lang].createdAt },
    { id: 8, title: '' },
  ];

  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    axios
      .get('/article')
      .then((response) => {
        setFetchedData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [clickedRecordID, setClickedRecordID] = useState('');
  const [clickedRecordName, setClickedRecordName] = useState();
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
  const resetDeletewModalHandler = useCallback(
    (e) => {
      setClickedRecordID('');
      setClickedRecordName('');
      setShowDeleteModal(false);
    },
    [showDeleteModal],
  );

  useEffect(() => {
    setModalContent(
      parse(`<br />${commonPhrazes[lang].confirmDeletion} <strong>${clickedRecordName}</strong>`),
    );
  }, [showDeleteModal, lang]);

  console.log(confirmDelete);

  useEffect(() => {
    if (confirmDelete) {
      setFetchedData(fetchedData && fetchedData.filter((item) => item._id !== confirmDelete));
      setModalContent('');
      setClickedRecordID('');
      setClickedRecordName('');
      setConfirmDelete(false);
      // setShowDeleteModal(false);
    }
  }, [confirmDelete]);

  console.log(clickedRecordID);

  return (
    <MainTemplate>
      <DeleteModal
        showDeleteModal
        dltModalTrigger={showDeleteModal}
        dltMdlResetFunc={resetDeletewModalHandler}
        dltMdlContent={modalContent}
        dltMdlIdtoDelete={clickedRecordID}
        dltModalDeleteApi="/article"
        dltMdlConfirmDelete={setConfirmDelete}
      />
      <AdminPageWrapper>
        <PageHeader title={articlePagePhrazes[lang].title} icon={['far', 'file-alt']} />
        <StyledSubheader>
          <p>
            {`${commonPhrazes[lang].founded} `}
            {fetchedData && fetchedData.length}
            {` ${commonPhrazes[lang].records}`}
          </p>
          <Button type="button" btnColor="green" btnClick={() => push('/admin/manage-article')}>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} fixedWidth transform="left-2" />
            {articlePagePhrazes[lang].newEntry}
          </Button>
        </StyledSubheader>
        {!fetchedData && <Spinner text={commonPhrazes[lang].loading} />}
        {fetchedData && fetchedData.length === 0 && (
          <ErrorBox fontMediun>{articlePagePhrazes[lang].noItems}</ErrorBox>
        )}
        {fetchedData && fetchedData.length > 0 && (
          <Table headerItems={TableHeader} className="fadeIn" tblHover tblStripped tblColor="blue">
            {fetchedData.map((item) => (
              <tr key={item._id} id={item._id} data-name={item.title[lang]}>
                <td>{item.title[lang]}</td>
                <td>
                  {item.articleType.type === 'serie'
                    ? `${commonPhrazes[lang].serie}`
                    : commonPhrazes[lang].category}
                </td>
                <td>{item.articleType.type === 'serie' && item.seriePart}</td>
                <td>{item.articleType.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={item.isEnabled ? ['far', 'check-circle'] : ['far', 'times-circle']}
                    size="lg"
                    style={item.isEnabled ? { color: 'green' } : { color: '#a42733' }}
                  />
                </td>

                <StyledOnlyBigScreenCell>{`${item.creator.firstName} ${item.creator.lastName}`}</StyledOnlyBigScreenCell>
                <StyledOnlyBigScreenCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </StyledOnlyBigScreenCell>
                <StyledButtonsCell>
                  <Button
                    type="button"
                    btnColor="indygo"
                    btnClick={() => push(`/admin/manage-article/${item._id}`)}
                  >
                    <FontAwesomeIcon icon={['fas', 'pen-nib']} fixedWidth />
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
export default AdminArticles;

/* eslint-disable no-underscore-dangle */
import React, {
  useContext, useState, useCallback, useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import { articleTypesPagePhrazes } from 'languages/articleTypesPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import { useApi } from 'hooks/useAPI';
import Table from 'components/molecules/Table/Table';
import Button from 'components/atoms/Button/Button';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import Link from 'components/atoms/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'components/atoms/Spinner/Spinner';
import FunctionalModal from 'components/organism/FunctionalModal/FunctionalModal';

const StyledAdminPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledSubheader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 20px;
`;

const AdminArticleTypes = () => {
  const { lang } = useContext(PageContext);
  const header = [
    { id: 1, title: articleTypesPagePhrazes[lang].name },
    { id: 3, title: articleTypesPagePhrazes[lang].type },
    { id: 5, title: articleTypesPagePhrazes[lang].icon },
    { id: 2, title: commonPhrazes[lang].published },
    { id: 4, title: articleTypesPagePhrazes[lang].author },
    { id: 6, title: articleTypesPagePhrazes[lang].createdAt },
    { id: 8, title: '' },
  ];

  const [fetchedData, setFetchedData] = useState();
  const [loadFfetchedData, setFLoadFetchedData] = useState(false);

  const { isLoading, resultData } = useApi('/article-type', 'GET', null, true, () => {});
  useEffect(() => {
    setFetchedData(resultData);
    setFLoadFetchedData(isLoading);
  }, [resultData, isLoading]);

  const [recordID, setRecordID] = useState('');
  const [recordName, setRecordName] = useState();
  const [viewItem, setViewItem] = useState(false);
  const [deletedID, setDeletedID] = useState(false);
  const [deletedItem, setDeletedItem] = useState(false);
  const getRecordID = useCallback(
    (e) => {
      setRecordID(e.target.closest('tr').id);
    },
    [recordID],
  );

  const getRecordName = useCallback(
    (e) => {
      setRecordName(e.target.closest('tr').dataset.name);
    },
    [recordName],
  );

  const setRecordToview = useCallback(
    (e) => {
      getRecordID(e);
      setViewItem(true);
    },
    [viewItem],
  );

  const setRecordDelete = useCallback(
    (e) => {
      getRecordName(e);
      getRecordID(e);
      setDeletedItem(true);
    },
    [viewItem],
  );

  useEffect(() => {
    setFetchedData(fetchedData && fetchedData.filter((item) => item._id !== deletedID));
    return () => {
      setDeletedID(null);
    };
  }, [deletedID, resultData]);

  return (
    <MainTemplate>
      <FunctionalModal
        modalShow={!!viewItem}
        modalType="preview"
        resetFunc={setViewItem}
        elemetId={recordID}
      />
      <FunctionalModal
        modalShow={!!deletedItem}
        modalType="delete"
        resetFunc={setDeletedItem}
        elemetId={recordID}
        returnDeletedId={setDeletedID}
        recordTitile={recordName}
      />
      <AdminPageWrapper>
        <StyledAdminPageWrapper>
          <PageHeader title={articleTypesPagePhrazes[lang].title} icon={['fas', 'stream']} />
          {loadFfetchedData ? (
            <Spinner text={commonPhrazes[lang].loading} />
          ) : (
            <>
              <StyledSubheader>
                <p>
                  {`${commonPhrazes[lang].founded} `}
                  {resultData && resultData.length}
                  {` ${commonPhrazes[lang].records}`}
                </p>
                <NavLink to="/admin/manage-article-type" style={{ float: 'rigth' }}>
                  <Button
                    type="button"
                    label={articleTypesPagePhrazes[lang].newType}
                    labelIcon={['far', 'plus-square']}
                    btnColor="green"
                    btnOutline
                    btnSmall
                  />
                </NavLink>
              </StyledSubheader>
              <Table headerItems={header} loading={isLoading} className="fadeIn">
                {fetchedData
                  && fetchedData.map((item) => (
                    <tr key={item._id} id={item._id} data-name={item.name}>
                      <td id="name">{item.name}</td>
                      <td>
                        {item.type === 'serie'
                          ? commonPhrazes[lang].serie
                          : commonPhrazes[lang].category}
                      </td>
                      <td>
                        <FontAwesomeIcon icon={item.icon.split(' ')} size="lg" fixedWidth />
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
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          flexFlow: 'row wrap',
                        }}
                      >
                        <Link
                          as={NavLink}
                          to={`/admin/manage-article-type/${item._id}`}
                          btncolor="blue"
                        >
                          <FontAwesomeIcon icon={['far', 'edit']} />
                        </Link>

                        <Button
                          type="button"
                          labelIcon={['far', 'eye']}
                          btnColor="green"
                          btnClick={setRecordToview}
                          btnSmall
                          btnIcon
                        />

                        <Button
                          type="button"
                          labelIcon={['far', 'trash-alt']}
                          btnColor="red"
                          btnClick={setRecordDelete}
                          btnSmall
                          btnIcon
                        />
                      </td>
                    </tr>
                  ))}
              </Table>
            </>
          )}
        </StyledAdminPageWrapper>
      </AdminPageWrapper>
    </MainTemplate>
  );
};

export default AdminArticleTypes;
// TODO change actions

/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
// import { PageContext } from 'context';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import Button from 'components/atoms/Button/Button';
import axios from 'axios';
import Spinner from 'components/atoms/Spinner/Spinner';
import Table from 'components/molecules/Table/Table';
import Link from 'components/atoms/Link/Link';

const StyledSubheader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 20px;
`;

const AdminGlossary = (props) => {
  const { lang } = useContext(PageContext);

  const header = [
    { id: 1, title: glossaryPagePhrazes[lang].abbr },
    { id: 2, title: glossaryPagePhrazes[lang].explication },
    { id: 3, title: commonPhrazes[lang].published },
    { id: 4, title: commonPhrazes[lang].icon },
    { id: 5, title: glossaryPagePhrazes[lang].author },
    { id: 8, title: '' },
  ];
  // const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState();

  // console.log(isLoading);
  // console.log(fetchedData);

  useEffect(() => {
    axios
      .get('/glossary')
      .then((response) => {
        setTimeout(() => {
          setFetchedData(response.data);
        }, 1000);
      })
      .catch((error) => {
        if (error.response) {
          setFetchedData(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        <PageHeader title={glossaryPagePhrazes[lang].title} icon={['fas', 'sort-alpha-down']} />
        <StyledSubheader>
          <p>
            {`${commonPhrazes[lang].founded} `}
            {fetchedData && fetchedData.length}
            {` ${commonPhrazes[lang].records}`}
          </p>
          <NavLink to="/admin/manage-glossary" style={{ float: 'rigth' }}>
            <Button
              type="button"
              label={glossaryPagePhrazes[lang].newEntry}
              labelIcon={['far', 'plus-square']}
              btnColor="green"
              btnSmall
            />
          </NavLink>
        </StyledSubheader>
        {!fetchedData && <Spinner text={commonPhrazes[lang].loading} />}
        {fetchedData && fetchedData.length === 0 && <p>No entries yet</p>}
        {fetchedData && fetchedData.length > 0 && (
          <Table
            headerItems={header}
            className="fadeIn"
            tblHover
            tblHoverColor="cyan"
            tblStripped
            tblHeaderColor="blue"
          >
            {fetchedData.map((item) => (
              <tr key={item._id}>
                <td>{item.abbreviation}</td>
                <td>{item.explication}</td>
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
                <td>{`${item.creator.firstName} ${item.creator.lastName}`}</td>
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexFlow: 'row wrap',
                  }}
                >
                  <Link as={NavLink} to={`/admin/manage-glossary/${item._id}`} btncolor="blue">
                    <FontAwesomeIcon icon={['far', 'edit']} />
                  </Link>

                  <Button
                    type="button"
                    labelIcon={['far', 'eye']}
                    btnColor="green"
                    btnClick={() => {}}
                    btnSmall
                    btnIcon
                  />

                  <Button
                    type="button"
                    labelIcon={['far', 'trash-alt']}
                    btnColor="red"
                    btnClick={() => {}}
                    btnSmall
                    btnIcon
                  />
                </td>
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

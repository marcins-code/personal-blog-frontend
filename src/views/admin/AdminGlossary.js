import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
// import { PageContext } from 'context';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import Button from 'components/atoms/Button/Button';

const StyledSubheader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 20px;
`;

const AdminGlossary = (props) => {
  const { lang } = useContext(PageContext);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        <PageHeader title={glossaryPagePhrazes[lang].title} icon={['fas', 'sort-alpha-down']} />
        <StyledSubheader>
          <p>
            {`${commonPhrazes[lang].founded} `}
            {/* {resultData && resultData.length} */}
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
      </AdminPageWrapper>
    </MainTemplate>
  );
};

AdminGlossary.propTypes = {};

export default AdminGlossary;

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import '../styles/index.styl'
import '../styles/fontawesome/web-fonts-with-css/css/fontawesome.min.css';
import '../styles/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="AirDrop Balance Checker" />
    <div>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import './index.scss';

const CustomUploadBox = ({
  multiple, handleFileChange, label, message, fileName,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop: (files) => handleFileChange(files),
  });

  return (
    <div className="upload-box-container">
      <div {...getRootProps({ className: 'upload-box' })}>
        <input {...getInputProps()} />
        <span className="upload-box-label">{label}</span>
      </div>
      <span className="upload-box-message">{message}</span>
      <span className="upload-box-file-name">{fileName}</span>
    </div>
  );
};

export default CustomUploadBox;

CustomUploadBox.defaultProps = {
  fileName: '',
};

CustomUploadBox.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  fileName: PropTypes.string,
};

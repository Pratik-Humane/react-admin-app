import React from 'react';
import PropTypes from 'prop-types';

const PreviewImage = ({ file, alt = 'preview', width = '100px', height = '100px' }) => {
    const [preview, setPreview] = React.useState(null)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setPreview(reader.result)
    return (
        <div style={{ marginLeft: 5 }}>
            <img src={preview} alt={alt} width={width} height={height} />
        </div>
    );
};

PreviewImage.propTypes = {
    file: PropTypes.object,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default PreviewImage;
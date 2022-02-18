import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Rap Việt ngày nay',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/1/1/c/7/11c769ee8fa3ccfb4a51ced62c860875.jpg'
        },
        {
            id: 2,
            name: 'Thay lời muốn nói',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/5/1/7/1/51713a7612a6bc0762f58639819d17cd.jpg'
        },
        {
            id: 3,
            name: 'Giai điệu và trào lưu',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/a/4/3/5/a4357a8ba399962dfec021efce9b1afc.jpg'
        },
        {
            id: 4,
            name: 'Pop Ballad Việt',
            thumbnailURL: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/2/4/9/9/2499544ae76dcc0a05b681ad859d3b48.jpg'
        },
    ]
    return (
        <div>
            <h2>Có thể bạn sẽ thích</h2>
            <AlbumList albumList={albumList}/>
        </div>
    );
}

export default AlbumFeature;
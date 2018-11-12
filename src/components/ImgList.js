import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

const imgsArr = [
  {
    src: 'qt.png',
    alt: '迎宾'
  },
  {
    src: 'yddqz.png',
    alt: '夜的第七章'
  },
  {
    src: 'xq.png',
    alt: '星晴'
  },
  {
    src: 'kanr.png',
    alt: '可爱女人'
  },
  {
    src: 'dfp.png',
    alt: '东风破'
  },
  {
    src: 'lsfb.png',
    alt: '蓝色风暴'
  },
  {
    src: 'shh.png',
    alt: '珊瑚海'
  },
  {
    src: 'wxdcf.png',
    alt: '温馨大床房'
  },
  {
    src: 'swdcf.png',
    alt: '商务大床房'
  },
  {
    src: 'swbj.png',
    alt: '商务标间'
  }
];
const imgsList = ((imgs) => {
  const arrList = [];
  imgs.forEach((img, index) => {
    arrList[index] = {
      src: require(`images/${img.src}`),
      alt: img.alt
    };
  });
  return arrList;
})(imgsArr);

class ImgList extends React.Component {
  render() {
    return (
      <BannerAnim
        prefixCls="banner"
        autoPlay
        autoPlaySpeed={3900}
        arrow={false}
        thumb={false}
        dragPlay={false}
      >
        {imgsList.map((img, index) => (
          <Element prefixCls="banner-elem" key={imgsArr[index].src}>
            <BgElement
              key="bg"
              className="bg"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <TweenOne className="banner-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
              {img.alt}
            </TweenOne>
          </Element>
        ))}
      </BannerAnim>
    );
  }
}

ImgList.defaultProps = {};
export default ImgList;

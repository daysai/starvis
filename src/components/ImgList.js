import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import './ImgList.css';

const BgElement = Element.BgElement;

const imgsArr = [
  {
    src: 'qt.png',
    alt: '迎宾'
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
    src: 'xldcf.png',
    alt: '限量大床房'
  },
  {
    src: 'swdcf.png',
    alt: '商务大床房'
  },
  {
    src: 'jxdcf.png',
    alt: '精选大床房'
  },
  {
    src: 'thbzj.png',
    alt: '特惠标准间'
  },
  {
    src: 'jxscf.png',
    alt: '精选双床房'
  },
  {
    src: 'jtf.png',
    alt: '家庭房'
  },
  {
    src: 'swsrj.png',
    alt: '商务三人间'
  }
];
const imgsList = ((imgs) => {
  const arrList = [];
  imgs.forEach((img, index) => {
    arrList[index] = {
      src: require(`../images/${img.src}`),
      alt: img.alt
    };
  });
  return arrList;
})(imgsArr);

function ImgList() {
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
            <TweenOne className="banner-title" animation={{ y: 30, opacity: 1, type: 'from' }}>
              {img.alt}
            </TweenOne>
          </Element>
        ))}
      </BannerAnim>
    );
}
export default ImgList;

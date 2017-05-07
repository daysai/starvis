import React from 'react';
import { findDOMNode } from 'react-dom'

const imgsArr = [{
    src: 'qt.png',
    alt: '前台'
}, {
    src: 'yddqz.png',
    alt: '夜的第七章'
}, {
    src: 'xq.png',
    alt: '星晴'
}, {
    src: 'kanr.png',
    alt: '可爱女人'
}, {
    src: 'dfp.png',
    alt: '东风破'
}, {
    src: 'lsfb.png',
    alt: '蓝色风暴'
}, {
    src: 'shh.png',
    alt: '珊瑚海'
}, {
    src: 'wxdcf.png',
    alt: '温馨大床房'
}, {
    src: 'swdcf.png',
    alt: '商务大床房'
}, {
    src: 'swbj.png',
    alt: '商务标间'
}];
const imgsList = ((imgs) => {
    let arrList = [];
    imgs.forEach((img, index) => {
        arrList[index] = {
            src: require('images/' + img.src),
            alt: img.alt
        }
    });
    return arrList;
})(imgsArr);


class ImgList extends React.Component {
    render() {
        const { currentImg } = this.props;
        return (
            <div className="img-box">
                <ul>
                    {imgsList.map((img, index) => {
                            let styleObj = {
                                opacity: (index === currentImg) ? 0 : 0.01,
                                display: (index === currentImg) ? 'block' : 'none'
                            };
                            return (<li key={index} style={styleObj} ref={"imgLi" + index}>
                                <img src={img.src} alt={img.alt}/>
                            </li>);
                        }
                    )}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        const { currentImg } = this.props;
        let realLi = findDOMNode(this.refs['imgLi' + currentImg]);
        startMove(realLi, {
            opacity: 100
        });
    }
    // componentWillReceiveProps(nextProps) {
    //     //每当收到新的props就执行动画
    //     const { currentImg } = nextProps;
    //     let realLi = findDOMNode(this.refs['imgLi' + currentImg]);
    //     startMove(realLi, {
    //         opacity: 100
    //     });
    // }
    componentDidUpdate() {
        const { currentImg } = this.props;
        let realLi = findDOMNode(this.refs['imgLi' + currentImg]);
        startMove(realLi, {
            opacity: 100
        });
    }
}

function getStyle(obj, attr) {
    if (obj.crrentStyle) {
        return obj.currentStyle[attr];
        //兼容IE8以下
    } else {
        return getComputedStyle(obj, false)[attr];
        //参数false已废。照用就好
    }
}

function startMove(obj, json) {
    //清理定时器
    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function() {
        var bStop = false; //如果为false就停了定时器！
        var iCur = 0;
        // 处理属性值
        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //定义速度值
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //检测停止：如果我发现某个值不等于目标点bStop就不能为true。
            if (iCur !== json[attr]) {
                bStop = false;
            } else {
                bStop = true;
            }
            if (attr == 'opacity') {
                obj.style[attr] = (iCur + iSpeed) / 100;
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        //检测是否停止，是的话关掉定时器
        if (bStop && iCur === json[attr]) {
            clearInterval(obj.timer);
        }
    }, 30);
}

ImgList.defaultProps = {};
export default ImgList;
